<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Http\Resources\PortRequestResource;
use App\Models\PortRequest;
use App\Models\User;
use App\Notifications\PortRequestStatusNotification;
use App\Notifications\NewPortRequestNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class AdminController extends Controller
{
    public function index(Request $req)
    {
        $statusFilter = $req->input('status') ?? null;
        $exposedFilter = intval($req->input('exposed')) ?? null;
        $searchFilter = $req->input('search');
        $portFilter = $req->input('port');
        $query = PortRequest::query()->with('user')->orderBy('id', 'desc');
        if ($statusFilter) {
            $query->where('status', $statusFilter);
        }
        if ($req->has('exposed')) {
            $exposedFilter = intval($req->input('exposed'));
            $query->where('exposed', $exposedFilter === 1);
        }
        if ($searchFilter) {
            $query->where(function ($subquery) use ($searchFilter) {
                $like = '%' . $searchFilter . '%';

                $subquery->where('fqdn', 'ILIKE', $like);

                if (filter_var($searchFilter, FILTER_VALIDATE_IP)) {
                    // Recherche stricte pour les IP valides
                    $subquery->orWhere('ip_address', $searchFilter);
                } else {
                    // Pour les valeurs textuelles, on évite l'erreur et fait un LIKE si c’est une chaîne
                    $subquery->orWhereRaw('CAST(ip_address AS TEXT) ILIKE ?', [$like]);
                }

                $subquery->orWhereRelation('user', 'full_name', 'ILIKE', $like);
            });
        }
        if ($portFilter !== null && $portFilter !== '') {
            $portFilter = preg_replace('/\D/', '', (string) $portFilter);
            if ($portFilter !== '') {
                $query->whereRaw('ports ILIKE ?', ['%"port":' . $portFilter . '%']);
            }
        }

        $requests = $query->paginate()->withQueryString();
        $coll = PortRequestResource::collection($requests);
        return inertia('admin/requests/index', [
            "requests" => $coll
        ]);
    }

    public function validateRequest(Request $request, int $id)
    {
        $portRequest = PortRequest::with('user')->find($id);
        if (!$portRequest) {
            return back()->with('error', 'Demande de port non trouvée');
        }

        // if ($portRequest->status !== StatusEnum::PENDING->value) {
        //     return back()->with('error', 'Cette demande a déjà été traitée');
        // }

        $portRequest->update([
            'status' => StatusEnum::APPROVED->value,
            'reason' => null,
        ]);

        // Envoyer une notification à l'utilisateur
        $portRequest->user->notify(
            new PortRequestStatusNotification(
                $portRequest,
                'approved'
            )
        );

        return back()->with('success', 'La demande a été approuvée avec succès');
    }

    public function rejectRequest(Request $request, int $id)
    {
        $request->validate([
            'reason' => 'nullable|string|min:10',
        ]);

        $portRequest = PortRequest::with('user')->find($id);
        if (!$portRequest) {
            return back()->with('error', 'Demande de port non trouvée');
        }

        // if ($portRequest->status !== StatusEnum::PENDING->value) {
        //     return back()->with('error', 'Cette demande a déjà été traitée');
        // }

        $portRequest->update([
            'status' => StatusEnum::REJECTED->value,
            'reason' => $request->input('reason'),
        ]);

        // Envoyer une notification à l'utilisateur
        $portRequest->user->notify(
            new PortRequestStatusNotification(
                $portRequest,
                'rejected',
                $request->input('reason')
            )
        );

        return back()->with('success', 'La demande a été rejetée avec succès');
    }
}
