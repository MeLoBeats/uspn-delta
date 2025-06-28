<?php

namespace App\Http\Controllers;

use App\Http\Resources\PortRequestResource;
use App\Models\PortRequest;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $requests = PortRequest::query()->orderBy('id', 'desc')->paginate()->withQueryString();
        $coll = PortRequestResource::collection($requests);
        return inertia('admin/requests/index', [
            "requests" => $coll
        ]);
    }
}
