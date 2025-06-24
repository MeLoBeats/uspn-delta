<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'admin',
    ];

    public function port_requests(): HasMany
    {
        return $this->hasMany(PortRequest::class);
    }

    public function is_admin(): bool
    {
        $isAdmin = AdminUsers::where('email', '=', $this->email)->first();
        return $isAdmin->count() === 1;
    }
}
