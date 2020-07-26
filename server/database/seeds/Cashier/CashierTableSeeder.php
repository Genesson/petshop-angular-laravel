<?php

use App\Models\UnityCashier;
use Illuminate\Database\Seeder;

class CashierTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UnityCashier::create([
            'unity' => 1,
            'amount' => 0,
            'status' => 'FECHADO'
        ]);
        UnityCashier::create([
            'unity' => 2,
            'amount' => 0,
            'status' => 'FECHADO'
        ]);
    }
}
