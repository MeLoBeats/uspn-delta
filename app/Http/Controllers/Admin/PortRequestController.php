<?php

namespace App\Http\Controllers\Admin;

use App\Enums\StatusEnum;
use App\Http\Controllers\Controller;
use App\Models\PortRequest;
use App\Models\User;
use App\Notifications\PortRequestStatusNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class PortRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $portFilter = $request->input('port');

        $requests = PortRequest::with('user')
            ->orderBy('created_at', 'desc')
            ->when($portFilter !== null && $portFilter !== '', function ($query) use ($portFilter) {
                $portFilter = preg_replace('/\D/', '', (string) $portFilter);
                if ($portFilter === '') {
                    return $query;
                }
                return $query->whereRaw('ports ILIKE ?', ['%"port":' . $portFilter . '%']);
            })
            ->paginate(15);
            
        return view('admin.requests.index', compact('requests'));
    }

    /**
     * Display the specified resource.
     */
    public function show(PortRequest $portRequest)
    {
        $portRequest->load('user');
        return view('admin.requests.show', compact('portRequest'));
    }

    /**
     * Update the status of the specified resource.
     */
    public function updateStatus(Request $request, PortRequest $portRequest)
    {
        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
            'reason' => 'required_if:status,rejected|string|nullable',
        ]);

        // Vérifier si la demande est déjà traitée
        if ($portRequest->status !== StatusEnum::PENDING->value) {
            return back()->with('error', 'Cette demande a déjà été traitée.');
        }

        // Mettre à jour le statut
        $portRequest->update([
            'status' => $validated['status'],
            'reason' => $validated['reason'] ?? null,
        ]);

        // Envoyer une notification à l'utilisateur
        $portRequest->user->notify(
            new PortRequestStatusNotification(
                $portRequest,
                $validated['status'],
                $validated['reason'] ?? null
            )
        );

        return back()->with('success', 'Le statut de la demande a été mis à jour avec succès.');
    }
}
