<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortRequest extends Model
{
    /** @use HasFactory<\Database\Factories\PortRequestFactory> */
    use HasFactory;

    protected $fillable = [
        'ip_address',
        'fqdn',
        'ports',
        'status',
        'reason',
        'exposed',
        'vlan',
        'description',
        'user_id',
    ];

    protected $casts = [
        'ports' => 'array', // Assuming ports is a JSON encoded array
        'exposed' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the status of the port request. By statusEnum, it can be one of the following:
     *
     * @return string
     */
    public function getStatusLabelAttribute(): string
    {
        return match ($this->status) {
            'pending'  => 'En attente',
            'approved' => 'Approuvée',
            'rejected' => 'Rejetée',
            default    => 'Inconnu',
        };
    }
}
