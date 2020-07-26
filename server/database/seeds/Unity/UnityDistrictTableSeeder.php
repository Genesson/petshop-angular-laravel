<?php

use App\Models\UnityDistrict;
use Illuminate\Database\Seeder;

class UnityDistrictTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UnityDistrict::create([
            'unity' => 1,
            'region' => 1,
            'description' => 'Centro',
            'status' => 'ACTIVE'
        ]);
        UnityDistrict::create([
            'unity' => 1,
            'region' => 1,
            'description' => 'Vila A',
            'status' => 'ACTIVE'
        ]);
        UnityDistrict::create([
            'unity' => 1,
            'region' => 1,
            'description' => 'Vila B',
            'status' => 'ACTIVE'
        ]);
    }
}
