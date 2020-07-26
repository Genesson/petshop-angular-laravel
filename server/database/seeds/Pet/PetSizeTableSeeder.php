<?php

use App\Models\PetSize;
use Illuminate\Database\Seeder;

class PetSizeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PetSize::create(['unity' => 1, 'description' => 'Baixo']);
        PetSize::create(['unity' => 1, 'description' => 'Médio']);
        PetSize::create(['unity' => 1, 'description' => 'Alto']);
        PetSize::create(['unity' => 1, 'description' => 'Todos']);
    }
}
