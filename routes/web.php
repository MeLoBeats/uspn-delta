<?php

use App\Http\Controllers\PortRequestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
