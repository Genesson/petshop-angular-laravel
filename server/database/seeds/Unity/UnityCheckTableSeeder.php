<?php

use App\Models\UnityCheck;
use Illuminate\Database\Seeder;

class UnityCheckTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UnityCheck::create([
            'unity' => 1,
            'description' => 'CHECK-IN: 11:00',
            'type' => 'CHECK-IN',
            'hour' => '11:00:00',
            'sunday' => true,
            'monday' => true,
            'tuesday' => true,
            'wednesday' => true,
            'thursday' => true,
            'friday' => true,
            'saturday' => true,
            'status' => true
        ]);
        UnityCheck::create([
            'unity' => 1,
            'description' => 'CHECK-OUT: 10:00',
            'type' => 'CHECK-OUT',
            'hour' => '10:00:00',
            'sunday' => true,
            'monday' => true,
            'tuesday' => true,
            'wednesday' => true,
            'thursday' => true,
            'friday' => true,
            'saturday' => true,
            'status' => true
        ]);
    }
}
