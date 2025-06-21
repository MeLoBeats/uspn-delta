<?php

namespace App\Http\Controllers;

use App\Http\Requests\PortRequest as RequestsPortRequest;
use App\Http\Resources\PortRequestResource;
use App\Models\PortRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PortRequestController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $search = $request->input('search');
        $searchFields = ['fqdn', 'ip_address', 'vlan'];
        $relationFields = [
            'user' => ['full_name', 'email'],
        ];

        $query = PortRequest::query()->where('user_id', '=', $user->id);

        if ($search) {
            $query->where(function ($q) use ($search, $searchFields, $relationFields) {
                // Recherche dans les colonnes locales
                foreach ($searchFields as $index => $field) {
                    $method = $index === 0 ? 'where' : 'orWhere';
                    $q->{$method}($field, 'ILIKE', "%{$search}%");
                }

                // Recherche dans les relations
                foreach ($relationFields as $relation => $fields) {
                    $q->orWhereHas($relation, function ($qRel) use ($fields, $search) {
                        foreach ($fields as $index => $field) {
                            $method = $index === 0 ? 'where' : 'orWhere';
                            $qRel->{$method}($field, 'ILIKE', "%{$search}%");
                        }
                    });
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
        $user = Auth::user();
        if (!$user) {
            return redirect("/")->with("flash.error", "Utilisateur non authentifié");
        }
        $portRequest = new PortRequest([
            "ip_address" => $request->ip_address,
            "fqdn" => $request->fqdn,
            "ports" => json_encode($request->ports),
            "vlan" => $request->vlan,
            "description" => $request->description,
        ]);
        $portRequest->user()->associate($user->id);
        $portRequest->save();
        return redirect(route('request.index'))->with('success', "Votre demande à bien été enregistrée");
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
