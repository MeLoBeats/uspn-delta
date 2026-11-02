<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePortRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "ip_address" => "required|ip",
            "fqdn" => "required|string|max:255",
            "ports" => "required|array",
            // Un port seul ("80") ou une plage ("8000-8100")
            "ports.*.port" => [
                "required",
                "regex:/^\d{1,5}(-\d{1,5})?$/",
                function (string $attribute, mixed $value, \Closure $fail) {
                    $bounds = array_map('intval', explode('-', (string) $value));
                    foreach ($bounds as $bound) {
                        if ($bound < 1 || $bound > 65535) {
                            return $fail("Le port doit être compris entre 1 et 65535.");
                        }
                    }
                    if (count($bounds) === 2 && $bounds[0] >= $bounds[1]) {
                        $fail("Le début de la plage doit être inférieur à la fin.");
                    }
                },
            ],
            "ports.*.name" => "required|string|max:255",
            "ports.*.protocol" => "required|string|in:tcp,udp,all",
            "exposed" => "boolean",
            "vlan" => "nullable|string|max:255",
            "description" => "nullable|string|max:1000",
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            "ip_address.required" => "L'adresse IP est requise.",
            "ip_address.ip" => "L'adresse IP doit être valide.",
            "fqdn.required" => "Le FQDN est requis.",
            "fqdn.string" => "Le FQDN doit être une chaîne de caractères.",
            "fqdn.max" => "Le FQDN ne peut pas dépasser 255 caractères.",
            "ports.required" => "Les ports sont requis.",
            "ports.array" => "Les ports doivent être un tableau.",
            "ports.*.port.required" => "Le port est requis.",
            "ports.*.port.regex" => "Le port doit être un nombre (ex: 80) ou une plage (ex: 8000-8100).",
            "ports.*.name.required" => "Le nom du port est requis.",
            "ports.*.name.string" => "Le nom du port doit être une chaîne de caractères.",
            "ports.*.name.max" => "Le nom du port ne peut pas   dépasser 255 caractères.",
            "ports.*.protocol.required" => "Le protocole est requis.",
            "ports.*.protocol.string" => "Le protocole doit être une chaîne de caractères.",
            "ports.*.protocol.in" => "Le protocole doit être soit TCP, soit UDP.",
            "exposed.boolean" => "L'exposition doit être un booléen.",
            "vlan.string" => "Le VLAN doit être une chaîne de caractères.",
            "vlan.max" => "Le VLAN ne peut pas dépasser 255 caractères.",
            "description.string" => "La description doit être une chaîne de caractères.",
            "description.max" => "La description ne peut pas dépasser 1000 caractères.",
        ];
    }
    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        // Ensure ports is an array if it's not already
        if (is_string($this->ports)) {
            $this->merge([
                'ports' => json_decode($this->ports, true) ?: [],
            ]);
        }

        // Normalise les plages saisies avec des espaces ("8000 - 8100" => "8000-8100")
        if (is_array($this->ports)) {
            $this->merge([
                'ports' => array_map(function ($port) {
                    if (is_array($port) && isset($port['port'])) {
                        $port['port'] = preg_replace('/\s+/', '', (string) $port['port']);
                    }
                    return $port;
                }, $this->ports),
            ]);
        }
    }
}
