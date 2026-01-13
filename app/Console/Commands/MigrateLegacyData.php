<?php

namespace App\Console\Commands;

use App\Models\PortRequest;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class MigrateLegacyData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:migrate-legacy-data {--chunk=500} {--dry-run}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $chunkSize = (int) $this->option('chunk');
        $dryRun = (bool) $this->option('dry-run');
        $total = 0;

        $query = DB::connection('mysql_legacy')
            ->table('declarations as d')
            ->join('ports as p', 'p.id', '=', 'd.declarable_id')
            ->where('d.declarable_type', 'App\\Models\\Port')
            ->select([
                'd.id as id',
                'd.id as declaration_id',
                'd.login',
                'd.email',
                'd.name',
                'd.description',
                'd.comment',
                'd.fqdn',
                'd.network_exposed',
                'd.vlan',
                'd.status as declaration_status',
                'd.created_at as declaration_created_at',
                'd.updated_at as declaration_updated_at',
                'p.ip',
                'p.port',
                'p.port_name',
                'p.protocol',
            ])
            ->orderBy('d.id');

        $query->chunkById($chunkSize, function ($rows) use (&$total, $dryRun) {
            foreach ($rows as $row) {
                if (empty($row->email)) {
                    $this->warn("Skipped declaration {$row->declaration_id}: missing email");
                    continue;
                }

                $user = User::firstOrCreate(
                    ['email' => $row->email],
                    ['full_name' => $row->name ?: $row->login ?: $row->email]
                );

                $ports = [
                    [
                        'port' => (int) $row->port,
                        'name' => $row->port_name,
                        'protocol' => $row->protocol,
                    ],
                ];

                $status = $this->mapStatus($row->declaration_status);
                $description = $row->description ?: $row->comment;
                $ipAddress = trim((string) $row->ip);

                if ($ipAddress === '') {
                    $this->warn("Skipped declaration {$row->declaration_id}: missing IP");
                    continue;
                }

                if ($dryRun) {
                    $total++;
                    continue;
                }

                PortRequest::create([
                    'ip_address' => $ipAddress,
                    'fqdn' => $row->fqdn,
                    'ports' => $ports,
                    'status' => $status,
                    'reason' => null,
                    'exposed' => (bool) $row->network_exposed,
                    'vlan' => $row->vlan,
                    'description' => $description,
                    'user_id' => $user->id,
                    'created_at' => $row->declaration_created_at,
                    'updated_at' => $row->declaration_updated_at,
                ]);

                $total++;
            }
        }, 'd.id', 'id');

        $this->info("Migrated {$total} port declarations.");
        return self::SUCCESS;
    }

    private function mapStatus(?string $legacyStatus): string
    {
        $normalized = Str::of((string) $legacyStatus)->lower()->ascii()->toString();

        if (str_contains($normalized, 'valid')) {
            return 'approved';
        }

        if (str_contains($normalized, 'refus') || str_contains($normalized, 'reject')) {
            return 'rejected';
        }

        return 'pending';
    }
}
