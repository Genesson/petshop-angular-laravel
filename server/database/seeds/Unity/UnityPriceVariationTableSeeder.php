<?php

use App\Models\UnityPriceVariation;
use Illuminate\Database\Seeder;

class UnityPriceVariationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UnityPriceVariation::create([
            'unity' => 1,
            'description' => 'Alta Temporada Carnaval',
            'start' => '2020-01-14',
            'end' => '2020-08-15',
            'value' => null,
            'percent' => 10,
            'module' => 'HOTEL',
            'status' => true
        ]);
        UnityPriceVariation::create([
            'unity' => 1,
            'description' => 'Alta Temporada Final de Ano',
            'start' => '2020-01-14',
            'end' => '2020-08-15',
            'value' => null,
            'percent' => 10,
            'module' => 'DAY_CARE',
            'status' => true
        ]);
        UnityPriceVariation::create([
            'unity' => 1,
            'description' => 'Alta Temporada Final de Ano',
            'start' => '2020-01-14',
            'end' => '2020-08-15',
            'value' => 40,
            'percent' => null,
            'module' => 'PET_SITTER',
            'status' => true
        ]);
    }
}
