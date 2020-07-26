<?php

use App\Models\UnityRegion;
use Illuminate\Database\Seeder;

class UnityRegionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UnityRegion::create([
            'unity' => 1,
            'description' => 'Região 1',
            'status' => 'ACTIVE'
        ]);
        UnityRegion::create([
            'unity' => 1,
            'description' => 'Região 2',
            'status' => 'ACTIVE'
        ]);
    }
}
