<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
    ];

    protected $casts = [
        'ports' => 'array', // Assuming ports is a JSON encoded array
        'exposed' => 'boolean',
    ];

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
