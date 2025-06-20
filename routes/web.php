<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortRequestController;
use App\Http\Middleware\CasAuth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('request.index');
})->name('home');

Route::resource('demandes', PortRequestController::class)
    ->only(['index', 'create', 'store', 'show', 'edit', 'update', 'destroy'])
    ->names([
        'index' => 'request.index',
        'create' => 'request.create',
        'store' => 'request.store',
        'show' => 'request.show',
        'edit' => 'request.edit',
        'update' => 'request.update',
        'destroy' => 'request.destroy',
    ])
    ->middleware(CasAuth::class);

Route::get('/deconnexion', [AuthController::class, "logout"])
    ->middleware(CasAuth::class)
    ->name('auth.logout');
