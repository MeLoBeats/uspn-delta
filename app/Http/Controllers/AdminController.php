<?php

namespace App\Http\Controllers;

use App\Http\Resources\PortRequestResource;
use App\Models\PortRequest;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(Request $req)
    {
        $statusFilter = $req->input('status') ?? null;
        $exposedFilter = intval($req->input('exposed')) ?? null;
        $query = PortRequest::query()->orderBy('id', 'desc');
        if ($statusFilter) {
            $query->where('status', $statusFilter);
        }
        if ($req->has('exposed')) {
            $exposedFilter = intval($req->input('exposed'));
            $query->where('exposed', $exposedFilter === 1);
        }

        $requests = $query->paginate()->withQueryString();
        $coll = PortRequestResource::collection($requests);
        return inertia('admin/requests/index', [
            "requests" => $coll
        ]);
    }
}
