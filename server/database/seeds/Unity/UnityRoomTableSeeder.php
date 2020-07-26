<?php

use App\Models\UnityRoom;
use Illuminate\Database\Seeder;

class UnityRoomTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UnityRoom::create([
            'unity' => 1,
            'description' => 'Quarto 01',
            'number' => 1,
            'status' => 'ACTIVE'
        ]);
        UnityRoom::create([
            'unity' => 1,
            'description' => 'Quarto 02',
            'number' => 2,
            'status' => 'ACTIVE'
        ]);
        UnityRoom::create([
            'unity' => 1,
            'description' => 'Quarto 03',
            'number' => 3,
            'status' => 'ACTIVE'
        ]);
        UnityRoom::create([
            'unity' => 1,
            'description' => 'Quarto 04',
            'number' => 4,
            'status' => 'ACTIVE'
        ]);
        UnityRoom::create([
            'unity' => 1,
            'description' => 'Quarto 05',
            'number' => 5,
            'status' => 'ACTIVE'
        ]);
        UnityRoom::create([
            'unity' => 1,
            'description' => 'Quarto 06',
            'number' => 6,
            'status' => 'ACTIVE'
        ]);
        UnityRoom::create([
            'unity' => 1,
            'description' => 'Quarto 07',
            'number' => 7,
            'status' => 'ACTIVE'
        ]);
        UnityRoom::create([
            'unity' => 1,
            'description' => 'Quarto 08',
            'number' => 8,
            'status' => 'ACTIVE'
        ]);
    }
}
