<?php

namespace App\Notifications;

use App\Models\PortRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class RequestCreated extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private PortRequest $portRequest)
    {
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $ports = collect(json_decode($this->portRequest->ports, true));
        $hasRange = $ports->contains(fn($port) => PortRequest::isPortRange($port['port']));

        return (new MailMessage)
            ->bcc('liam.ghoggal@univ-paris13.fr')
            ->subject($hasRange ? "🔔 Nouvelle demande de port en attente (plage de ports)" : "🔔 Nouvelle demande de port en attente")
            ->greeting('Nouvelle demande de port')
            ->line('Une nouvelle demande de port a été soumise et nécessite votre attention.')
            ->line('')
            ->line('**Détails de la demande :**')
            ->line('')
            ->line("👤 **Demandeur :** {$this->portRequest->user->full_name}")
            ->line("📧 **Email :** {$this->portRequest->user->email}")
            ->line("🌐 **FQDN :** `{$this->portRequest->fqdn}`")
            ->line("🔌 **Adresse IP :** `{$this->portRequest->ip_address}`")
            ->line('')
            ->line('**Ports demandés :**')
            ->lines($ports->map(fn($port) => PortRequest::isPortRange($port['port'])
                ? "- ⚠️ **PLAGE {$port['port']}**/{$port['protocol']} ({$port['name']})"
                : "- {$port['port']}/{$port['protocol']} ({$port['name']})"))
            ->lineIf($hasRange, '')
            ->lineIf($hasRange, "⚠️ **Cette demande contient une plage de ports : la règle doit être créée sur la plage complète (règle de type range), pas port par port.**")
            ->line('')
            ->line("📅 **Date de la demande :** {$this->portRequest->created_at->format('d/m/Y à H:i')}")
            ->action('Voir la demande', route('admin.requests.index'))
            ->line('')
            ->salutation("Cordialement,");
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            "portRequest" => $this->portRequest,
        ];
    }
}
