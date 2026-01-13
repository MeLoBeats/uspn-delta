<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Http\Requests\StorePortRequest as StorePortRequest;
use App\Http\Resources\PortRequestResource;
use App\Models\PortRequest;
use App\Models\User;
use App\Notifications\NewPortRequestNotification;
use App\Notifications\PortRequestStatusNotification;
use App\Notifications\RequestCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

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

    public function store(StorePortRequest $request)
    {
        $user = Auth::user();
        if (!$user) {
            return redirect("/")->with("flash.error", "Utilisateur non authentifié");
        }
        // Créer la demande avec les données validées
        $portRequest = new PortRequest();
        $portRequest->ip_address = $request->validated('ip_address');
        $portRequest->fqdn = $request->validated('fqdn');
        $portRequest->ports = json_encode($request->validated('ports'));
        $portRequest->vlan = $request->validated('vlan');
        $portRequest->description = $request->validated('description');
        $portRequest->exposed = (bool)$request->validated('exposed', false);
        
        $portRequest->user()->associate($user->id);
        $portRequest->save();

        // Envoyer une notification à l'équipe réseau
        $networkEmail = 'reseau@univ-paris13.fr';
        
        // Si l'exposition est publique, ajouter rssi@univ-paris13.fr en copie
        $recipients = [$networkEmail];
        if ($portRequest->exposed) {
            $recipients[] = 'rssi@univ-paris13.fr';
        }
        
        // Envoyer les notifications
        foreach ($recipients as $email) {
            Notification::route('mail', $email)
                ->notify(new RequestCreated($portRequest));
        }

        return redirect(route('request.index'))->with('success', "Votre demande a bien été enregistrée");
    }

    public function update(StorePortRequest $request, $id)
    {
        $portRequest = PortRequest::find($id);
        if ($portRequest->status !== StatusEnum::PENDING->value) {
            return redirect(route('request.index'))->with('error', "Vous ne pouvez pas éditer une demande déjà traitée");
        }
        $validated = $request->validated();
        $portRequest->update([
            ...$validated,
            "ports" => json_encode($validated['ports']),
        ]);
        return redirect(route('request.index'))->with('success', "Votre demande à bien été mise à jour");
    }

    public function destroy($id)
    {
        $portRequest = PortRequest::find($id);
        if (!$portRequest) {
            return redirect(route('request.index'))->with('error', "Cette demande n'existe pas");
        }
        if ($portRequest->user_id !== Auth::user()->id) {
            return redirect(route('request.index'))->with('error', "Vous n'avez pas la permission de supprimer cette demande");
        }
        if ($portRequest->status !== StatusEnum::PENDING->value) {
            return redirect(route('request.index'))->with('error', "Vous ne pouvez pas supprimer une demande déjà traitée");
        }
        $portRequest->delete();
        return redirect(route('request.index'))->with('success', "La demande à bien été supprimée !");
    }
}
