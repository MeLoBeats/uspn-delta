@component('mail::layout')
{{-- Header --}}
@slot('header')
@component('mail::header', ['url' => config('app.url')])
{{ config('app.name') }}
@endcomponent
@endslot

# Nouvelle demande d'ouverture de port

Bonjour,

Une nouvelle demande d'ouverture de port a été soumise et nécessite votre attention.

## Détails de la demande

- **Demandeur :** {{ $portRequest->user->full_name ?? 'Non spécifié' }} ({{ $portRequest->user->email ?? 'Non spécifié' }})
- **Date de la demande :** {{ $portRequest->created_at->format('d/m/Y H:i') }}
- **Adresse IP :** {{ $portRequest->ip_address }}
- **FQDN :** {{ $portRequest->fqdn }}
- **Ports :**
  @foreach(json_decode($portRequest->ports, true) as $port)
  - {{ $port['port'] }}/{{ $port['protocol'] }} ({{ $port['name'] }})
  @endforeach
- **VLAN :** {{ $portRequest->vlan ?? 'Non spécifié' }}
- **Exposition :** {{ $portRequest->exposed ? 'Publique' : 'Interne' }}
- **Description :** {{ $portRequest->description ?? 'Aucune description fournie' }}

@component('mail::button', ['url' => route('admin.requests.show', $portRequest->id)])
Voir la demande
@endcomponent

{{-- Footer --}}
@slot('footer')
@component('mail::footer')
© {{ date('Y') }} {{ config('app.name') }}. Tous droits réservés.
@endcomponent
@endslot
@endcomponent
