<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortRequestController;
use App\Http\Middleware\Admin;
use App\Http\Middleware\CasAuth;
use App\Models\PortRequest;
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
    ]);

Route::get('/admin/demandes', function () {
    $requests = PortRequest::all();
    dd($requests);
})->middleware(Admin::class);

Route::get('/deconnexion', [AuthController::class, "logout"])
    ->name('auth.logout');
