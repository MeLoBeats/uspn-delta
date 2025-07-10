<?php

namespace App\Http\Controllers;

use App\Enums\StatusEnum;
use App\Http\Resources\PortRequestResource;
use App\Models\PortRequest;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(Request $req)
    {
        $statusFilter = $req->input('status') ?? null;
        $exposedFilter = intval($req->input('exposed')) ?? null;
        $searchFilter = $req->input('search');
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

        $requests = $query->paginate()->withQueryString();
        $coll = PortRequestResource::collection($requests);
        return inertia('admin/requests/index', [
            "requests" => $coll
        ]);
    }

    public function validateRequest(int $id)
    {
        $portReq = PortRequest::find($id);
        if (!$portReq) {
            return redirect(route('admin.requests.index'))->with('error', "La demande n'existe pas");
        }

        $portReq->status = StatusEnum::APPROVED->value;
        $portReq->save();
        return redirect(route('admin.requests.index'))->with('success', "La demande à bien été validée");
    }

    public function rejectRequest(Request $req, int $id)
    {
        $reason = $req->input("reason");
        $portReq = PortRequest::find($id);
        if (!$portReq) {
            return redirect(route('admin.requests.index'))->with('error', "La demande n'existe pas");
        }

        $portReq->status = StatusEnum::REJECTED->value;
        if ($reason) {
            $portReq->reason = $reason;
        }
        $portReq->save();
        return redirect(route('admin.requests.index'))->with('success', "La demande à bien été rejetée");
    }
}
