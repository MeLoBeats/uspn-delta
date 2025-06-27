<?php

namespace Database\Seeders;

use App\Models\AdminUsers;
use App\Models\PortRequest;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(50)->create();
        AdminUsers::create([
            "email" => "liam.ghoggal@univ-paris13.fr"
        ]);
        PortRequest::factory(50)->create();
    }
}
