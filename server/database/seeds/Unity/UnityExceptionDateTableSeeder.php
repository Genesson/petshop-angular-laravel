<?php

use App\Models\UnityExceptionDate;
use Illuminate\Database\Seeder;

class UnityExceptionDateTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UnityExceptionDate::create([
            'unity' => 1,
            'description' => 'Carnaval',
            'date_start' => '2020-02-23',
            'date_end' => '2020-02-24',
            'status' => 'ACTIVE'
        ]);
        UnityExceptionDate::create([
            'unity' => 1,
            'description' => 'Natal',
            'date_start' => '2020-12-24',
            'date_end' => '2020-12-26',
            'status' => 'ACTIVE'
        ]);
    }
}
