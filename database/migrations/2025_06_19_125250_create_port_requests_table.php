<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('port_requests', function (Blueprint $table) {
            $table->id();

            $table->ipAddress('ip_address')->comment('IP address of the request');
            $table->string('fqdn')->nullable()->comment('FQDN associated with the request');
            $table->string('ports')->comment('Ports requested, JSON encoded array'); // e.g. [{port: 80, name: "HTTP", protocol: "TCP"}]

            $table->string('status')->default(StatusEnum::PENDING)->comment('Status of the port request'); // e.g. pending, approved, rejected
            $table->string('reason')->nullable()->comment('Reason for rejection if applicable');

            $table->boolean('exposed')->default(false)->comment('Whether the port is exposed to the public internet');
            $table->string('vlan')->nullable()->comment('VLAN associated with the port request');

            $table->string('description')->nullable()->comment('Description of the port request');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('port_requests');
    }
};
