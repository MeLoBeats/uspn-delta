<?php

namespace App\Enums;

enum StatusEnum: string
{
    case PENDING = 'pending';
    case APPROVED = 'approved';
    case REJECTED = 'rejected';

    public function label(): string
    {
        return match ($this) {
            self::PENDING => 'En attente',
            self::APPROVED => 'Approuvée',
            self::REJECTED => 'Rejetée',
        };
    }
}
