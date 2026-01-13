<?php

namespace App\Notifications;

use App\Models\PortRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewPortRequestNotification extends Notification
{
    use Queueable;

    public function __construct(public PortRequest $portRequest)
    {
        //
    }

    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Nouvelle demande d\'ouverture de port')
            ->view('emails.new-port-request', [
                'portRequest' => $this->portRequest
            ]);
    }

    public function toArray(object $notifiable): array
    {
        return [
            'port_request_id' => $this->portRequest->id,
        ];
    }
}
