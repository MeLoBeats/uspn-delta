<?php

namespace App\Notifications;

use App\Models\PortRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PortRequestStatusNotification extends Notification
{
    use Queueable;

    public function __construct(
        public PortRequest $portRequest,
        public string $status,
        public ?string $reason = null
    ) {
        //
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        $subject = $this->status === 'approved' 
            ? 'Votre demande d\'ouverture de port a été approuvée'
            : 'Votre demande d\'ouverture de port a été rejetée';

        $mailMessage = (new MailMessage)
            ->subject($subject)
            ->greeting('Bonjour ' . ($this->portRequest->user->full_name ?? ''). ',')
            ->line($this->status === 'approved' 
                ? 'Votre demande d\'ouverture de port a été approuvée par l\'équipe réseau.'
                : 'Votre demande d\'ouverture de port a été rejetée par l\'équipe réseau.');

        if ($this->status === 'rejected' && $this->reason) {
            $mailMessage->line('**Raison du rejet :** ' . $this->reason);
        }

        $mailMessage
            ->line('')
            ->line('**Détails de la demande :**')
            ->line('- Date de la demande : ' . $this->portRequest->created_at->format('d/m/Y H:i'))
            ->line('- Adresse IP : ' . $this->portRequest->ip_address)
            ->line('- FQDN : ' . $this->portRequest->fqdn)
            ->line('**Ports :**');

        foreach (json_decode($this->portRequest->ports, true) as $port) {
            $mailMessage->line('  - ' . $port['port'] . '/' . $port['protocol'] . ' (' . $port['name'] . ')');
        }

        $mailMessage
            ->line('- VLAN : ' . ($this->portRequest->vlan ?? 'Non spécifié'))
            ->line('- Description : ' . ($this->portRequest->description ?? 'Aucune description fournie'))
            ->line('')
            ->line($this->status === 'approved'
                ? 'Votre demande a été traitée avec succès. Les ports devraient être ouverts sous peu.'
                : 'Si vous pensez qu\'il s\'agit d\'une erreur, n\'hésitez pas à contacter l\'équipe réseau pour plus d\'informations.');

        return $mailMessage;
    }

    public function toArray(object $notifiable): array
    {
        return [
            'port_request_id' => $this->portRequest->id,
            'status' => $this->status,
            'reason' => $this->reason,
        ];
    }
}
