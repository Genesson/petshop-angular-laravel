<?php

use App\Models\UnityCardFlag;
use Illuminate\Database\Seeder;

class UnityCardFlagTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UnityCardFlag::create([
            'unity' => 1,
            'description' => 'Visa',
            'status' => 'ACTIVE'
        ]);
        UnityCardFlag::create([
            'unity' => 1,
            'description' => 'Mastercard',
            'status' => 'ACTIVE'
        ]);
    }
}
