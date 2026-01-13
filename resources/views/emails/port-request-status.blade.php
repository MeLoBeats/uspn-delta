@component('mail::layout')
{{-- Header --}}
@slot('header')
@component('mail::header', ['url' => config('app.url')])
{{ config('app.name') }}
@endcomponent
@endslot

@if($status === 'approved')
# Votre demande d'ouverture de port a été approuvée

Bonjour {{ $portRequest->user->full_name ?? '' }},

Votre demande d'ouverture de port a été approuvée par l'équipe réseau.

## Détails de la demande approuvée

@else
# Votre demande d'ouverture de port a été rejetée

Bonjour {{ $portRequest->user->full_name ?? '' }},

Votre demande d'ouverture de port a été rejetée par l'équipe réseau.

**Raison du rejet :** {{ $reason ?? 'Aucune raison spécifiée' }}

## Détails de la demande rejetée

@endif

- **Date de la demande :** {{ $portRequest->created_at->format('d/m/Y H:i') }}
- **Adresse IP :** {{ $portRequest->ip_address }}
- **FQDN :** {{ $portRequest->fqdn }}
- **Ports :**
  @foreach(json_decode($portRequest->ports, true) as $port)
  - {{ $port['port'] }}/{{ $port['protocol'] }} ({{ $port['name'] }})
  @endforeach
- **VLAN :** {{ $portRequest->vlan ?? 'Non spécifié' }}
- **Description :** {{ $portRequest->description ?? 'Aucune description fournie' }}

@if($status === 'approved')
Votre demande a été traitée avec succès. Les ports devraient être ouverts sous peu.
@else
Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à répondre à cet email pour plus d'informations.
@endif

@component('mail::button', ['url' => route('request.show', $portRequest->id)])
Voir ma demande
@endcomponent

{{-- Footer --}}
@slot('footer')
@component('mail::footer')
© {{ date('Y') }} {{ config('app.name') }}. Tous droits réservés.
@endcomponent
@endslot
@endcomponent
