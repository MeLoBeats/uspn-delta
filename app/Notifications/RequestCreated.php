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
        return (new MailMessage)
            ->bcc('liam.ghoggal@univ-paris13.fr')
            ->subject("🔔 Nouvelle demande de port en attente")
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
            ->lines(collect(json_decode($this->portRequest->ports, true))->map(fn($port) => "- {$port['port']}/{$port['protocol']} ({$port['name']})"))
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
