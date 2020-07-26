<?php

use App\Models\UnityService;
use Illuminate\Database\Seeder;

class UnityServiceTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $service = UnityService::create([
            'unity' => 1,
            'description' => 'Banho',
            'type' => 'SHOWER',
            'status' => true
        ]);

                    UnityService::create([
                        'unity' => 1,
                        'service' => $service->id,
                        'size' => 2,
                        'breed' => 16,
                        'type_fur' => 2,
                        'time' => 40,
                        'price' => 55,
                        'status' => true
                    ]);

                $service = UnityService::create([
                    'unity' => 1,
                    'description' => 'Tosa',
                    'type' => 'SUB_SHOWER',
                    'status' => true
                ]);

                    UnityService::create([
                        'unity' => 1,
                        'service' => $service->id,
                        'size' => 2,
                        'breed' => 16,
                        'type_fur' => 2,
                        'time' => 60,
                        'price' => 90,
                        'status' => true
                    ]);

                $service = UnityService::create([
                    'unity' => 1,
                    'description' => 'Hidratação',
                    'type' => 'SUB_SHOWER',
                    'status' => true
                ]);

                    UnityService::create([
                        'unity' => 1,
                        'service' => $service->id,
                        'size' => 2,
                        'breed' => 16,
                        'type_fur' => 2,
                        'time' => 30,
                        'price' => 30,
                        'status' => true
                    ]);

                $service = UnityService::create([
                    'unity' => 1,
                    'description' => 'Tosa Higienica',
                    'type' => 'SUB_SHOWER',
                    'status' => true
                ]);

                    UnityService::create([
                        'unity' => 1,
                        'service' => $service->id,
                        'size' => 2,
                        'breed' => 16,
                        'type_fur' => 2,
                        'time' => 30,
                        'price' => 30,
                        'status' => true
                    ]);

        $service = UnityService::create([
            'unity' => 1,
            'description' => 'Transporte',
            'type' => 'TRANSPORT',
            'status' => true
        ]);

            UnityService::create([
                'unity' => 1,
                'service' => $service->id,
                'region' => 1,
                'description' => 'Transporte',
                'price' => 20,
                'status' => true
            ]);

        $service = UnityService::create([
            'unity' => 1,
            'description' => 'Pet Sitter',
            'type' => 'PET_SITTER',
            'status' => true
        ]);

            UnityService::create([
                'unity' => 1,
                'user' => 1,
                'service' => $service->id,
                'region' => 1,
                'description' => 'Pet Sitter',
                'time' => 60,
                'price' => 120,
                'status' => true
            ]);

        $service = UnityService::create([
            'unity' => 1,
            'description' => 'Creche',
            'type' => 'DAY_CARE',
            'status' => true
        ]);

            UnityService::create([
                'unity' => 1,
                'service' => $service->id,
                'size' => 2,
                'period' => 'INTEIRA',
                'price' => 120,
                'status' => true
            ]);

        $service = UnityService::create([
            'unity' => 1,
            'description' => 'Hotel',
            'type' => 'HOTEL',
            'status' => true
        ]);

            UnityService::create([
                'unity' => 1,
                'service' => $service->id,
                'size' => 2,
                'period' => 'INTEIRA',
                'price' => 80,
                'status' => true
            ]);

        $service = UnityService::create([
            'unity' => 1,
            'description' => 'Outros Serviços',
            'type' => 'OTHER',
            'status' => true
        ]);

            UnityService::create([
                'unity' => 1,
                'service' => $service->id,
                'description' => 'Corte de Unha',
                'time' => 20,
                'price' => 15,
                'status' => true
            ]);

        UnityService::create([
            'unity' => 2,
            'description' => 'Banho',
            'type' => 'SHOWER',
            'status' => true
        ]);

                UnityService::create([
                    'unity' => 2,
                    'description' => 'Tosa',
                    'type' => 'SUB_SHOWER',
                    'status' => true
                ]);
                UnityService::create([
                    'unity' => 2,
                    'description' => 'Hidratação',
                    'type' => 'SUB_SHOWER',
                    'status' => true
                ]);
                UnityService::create([
                    'unity' => 2,
                    'description' => 'Tosa Higienica',
                    'type' => 'SUB_SHOWER',
                    'status' => true
                ]);

        UnityService::create([
            'unity' => 2,
            'description' => 'Transporte',
            'type' => 'TRANSPORT',
            'status' => true
        ]);
        UnityService::create([
            'unity' => 2,
            'description' => 'Pet Sitter',
            'type' => 'PET_SITTER',
            'status' => true
        ]);
        UnityService::create([
            'unity' => 2,
            'description' => 'Creche',
            'type' => 'DAY_CARE',
            'status' => true
        ]);
        UnityService::create([
            'unity' => 2,
            'description' => 'Hotel',
            'type' => 'HOTEL',
            'status' => true
        ]);
        UnityService::create([
            'unity' => 2,
            'description' => 'Outros Serviços',
            'type' => 'OTHER',
            'status' => true
        ]);
    }
}
