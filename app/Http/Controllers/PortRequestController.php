<?php

namespace App\Http\Controllers;

use App\Http\Requests\PortRequest as RequestsPortRequest;
use App\Http\Resources\PortRequestResource;
use App\Models\PortRequest;
use Illuminate\Http\Request;

class PortRequestController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $searchFields = ['fqdn', 'ip', 'vlan'];

        $query = PortRequest::query();

        if ($search) {
            $query->where(function ($q) use ($search, $searchFields) {
                foreach ($searchFields as $field) {
                    $q->orWhere($field, 'like', "%{$search}%");
                }
            });
        }

        $requests = $query->orderBy('created_at', 'desc')->paginate()->withQueryString();
        $resource = PortRequestResource::collection($requests);

        return inertia('requests/index', ["requests" => $resource]);
    }

    public function show($id)
    {
        // Logic to show a specific port request
    }

    public function create()
    {
        return inertia('requests/create');
    }

    public function store(RequestsPortRequest $request)
    {
        $portRequest = new PortRequest([
            "ip_address" => $request->ip_address,
            "fqdn" => $request->fqdn,
            "ports" => json_encode($request->ports),
            "vlan" => $request->vlan,
            "description" => $request->description,
        ]);
        $portRequest->save();
        return redirect(route('request.index'));
        // Logic to store a new port request
    }

    public function edit($id)
    {
        // Logic to show the form for editing a port request
    }

    public function update(Request $request, $id)
    {
        // Logic to update a port request
    }

    public function destroy($id)
    {
        // Logic to delete a port request
    }
}
