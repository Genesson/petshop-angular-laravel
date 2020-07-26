<?php

use App\Models\PetBehavior;
use Illuminate\Database\Seeder;

class PetBehaviorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PetBehavior::create(['unity' => 1, 'description' => 'Amigável']);
        PetBehavior::create(['unity' => 1, 'description' => 'Calmo']);
        PetBehavior::create(['unity' => 1, 'description' => 'Dócil']);
        PetBehavior::create(['unity' => 1, 'description' => 'Teimoso']);
        PetBehavior::create(['unity' => 1, 'description' => 'Travesso']);
    }
}
