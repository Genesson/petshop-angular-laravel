<?php

use App\Models\PetTypeFur;
use Illuminate\Database\Seeder;

class PetTypeFurTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        PetTypeFur::create(['unity' => 1, 'type' => '1', 'description' => 'Pelo curto']);
        PetTypeFur::create(['unity' => 1, 'type' => '1', 'description' => 'Pelo longo']);
        PetTypeFur::create(['unity' => 1, 'type' => '1', 'description' => 'Pelo encaracolado']);
        PetTypeFur::create(['unity' => 1, 'type' => '1', 'description' => 'Pelagem dupla']);
        PetTypeFur::create(['unity' => 1, 'type' => '1', 'description' => 'Pelo longo e curto']);
        PetTypeFur::create(['unity' => 1, 'type' => '2', 'description' => 'Escamas']);
        PetTypeFur::create(['unity' => 1, 'type' => '2', 'description' => 'Sólido']);
        PetTypeFur::create(['unity' => 1, 'type' => '2', 'description' => 'Tabby']);
        PetTypeFur::create(['unity' => 1, 'type' => '2', 'description' => 'Branco']);
        PetTypeFur::create(['unity' => 1, 'type' => '2', 'description' => 'Golden']);
        PetTypeFur::create(['unity' => 1, 'type' => '2', 'description' => 'Frajola']);
    }
}
