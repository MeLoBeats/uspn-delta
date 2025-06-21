<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PortRequest>
 */
class PortRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'ip_address' => $this->faker->ipv4,
            'fqdn' => $this->faker->domainName,
            'ports' => json_encode([
                [
                    'port' => $this->faker->numberBetween(1, 65535),
                    'name' => $this->faker->word,
                    'protocol' => $this->faker->randomElement(['TCP', 'UDP']),
                ],
            ]),
            'exposed' => $this->faker->boolean,
            'vlan' => $this->faker->optional()->word,
            'description' => $this->faker->optional()->sentence,
            'user_id' => $this->faker->numberBetween(1, 49)
        ];
    }
}
