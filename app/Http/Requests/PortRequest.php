<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PortRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
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
            "ports.*.port" => "required|integer|min:1|max:65535",
            "ports.*.name" => "required|string|max:255",
            "ports.*.protocol" => "required|string|in:TCP,UDP",
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
            "ports.*.port.integer" => "Le port doit être un entier.",
            "ports.*.port.min" => "Le port doit être supérieur ou égal à 1.",
            "ports.*.port.max" => "Le port doit être inférieur ou égal à 65535.",
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
    }
}
