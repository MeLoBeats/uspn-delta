<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PortRequestResource extends JsonResource
{
    public static $wrap = null;

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'          => $this->id,
            'ipAddress'   => $this->ip_address,
            'fqdn'        => $this->fqdn,
            'status'      => $this->status,
            'statusLabel' => $this->status_label,
            'reason'      => $this->reason,
            'exposed'     => $this->exposed,
            'vlan'        => $this->vlan,
            'ports'       => json_decode($this->ports),
            'description' => $this->description,
            'createdAt' => $this->created_at->format('Y-m-d'),
            'updatedAt' => $this->updated_at->format('Y-m-d'),
        ];
    }
}
