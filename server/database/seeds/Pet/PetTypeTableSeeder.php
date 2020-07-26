<?php

use App\Models\PetType;
use Illuminate\Database\Seeder;

class PetTypeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PetType::create(['unity' => 1, 'description' => 'Cachorro']);
        PetType::create(['unity' => 1, 'description' => 'Gato']);
    }
}
