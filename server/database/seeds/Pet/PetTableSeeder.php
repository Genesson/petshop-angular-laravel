<?php

use App\Models\Pet;
use Illuminate\Database\Seeder;

class PetTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Pet::create([
            'unity' => 1,
            'user' => 2,
            'avatar' => 'https://api.kando-so.com.br/storage/images/pets/pet-1.jpg',
            'name' => 'Fred',
            'type' => 1,
            'breed' => 16,
            'gender' => 'MALE',
            'size' => 2,
            'type_fur' => 5,
            'date_birth' => '2018-07-02',
            'castrated' => false,
            'ration_brand' => 'Special Dog',
            'times_day' => 2,
            'amount_time' => 100,
            'types_food' => 'Ração Seca',
            'obs_food' => 'Dar apenas ração',
            'sachet' => true,
            'perfume' => true,
            'ornament' => true,
            'alive' => true,
            'pool' => true,
            'obs_general' => 'Tratar com cuidado',
            'vet_name' => 'Jéssica',
            'vet_phone' => '(44) 9 9999-9999',
            'obs_medical' => 'Cuidar para não ter problemas no coração',
            'vaccination_carter' => '',
            'behavior' => 1,
            'status' => 'ACTIVE'
        ]);
        Pet::create([
            'unity' => 1,
            'user' => 3,
            'avatar' => 'https://api.kando-so.com.br/storage/images/pets/pet-2.jpg',
            'name' => 'Scott',
            'type' => 1,
            'breed' => 16,
            'gender' => 'MALE',
            'size' => 2,
            'type_fur' => 5,
            'date_birth' => '2018-07-02',
            'castrated' => false,
            'ration_brand' => 'Special Dog',
            'times_day' => 2,
            'amount_time' => 100,
            'types_food' => 'Ração Seca',
            'obs_food' => 'Dar apenas ração',
            'sachet' => true,
            'perfume' => true,
            'ornament' => true,
            'alive' => true,
            'pool' => true,
            'obs_general' => 'Tratar com cuidado',
            'vet_name' => 'Jéssica',
            'vet_phone' => '(44) 9 9999-9999',
            'obs_medical' => 'Cuidar para não ter problemas no coração',
            'vaccination_carter' => '',
            'behavior' => 1,
            'status' => 'ACTIVE'
        ]);
        Pet::create([
            'unity' => 1,
            'user' => 3,
            'avatar' => 'https://api.kando-so.com.br/storage/images/pets/pet-3.jpg',
            'name' => 'Bolota',
            'type' => 1,
            'breed' => 16,
            'gender' => 'MALE',
            'size' => 2,
            'type_fur' => 5,
            'date_birth' => '2018-07-02',
            'castrated' => false,
            'ration_brand' => 'Special Dog',
            'times_day' => 2,
            'amount_time' => 100,
            'types_food' => 'Ração Seca',
            'obs_food' => 'Dar apenas ração',
            'sachet' => true,
            'perfume' => true,
            'ornament' => true,
            'alive' => true,
            'pool' => true,
            'obs_general' => 'Tratar com cuidado',
            'vet_name' => 'Jéssica',
            'vet_phone' => '(44) 9 9999-9999',
            'obs_medical' => 'Cuidar para não ter problemas no coração',
            'vaccination_carter' => '',
            'behavior' => 1,
            'status' => 'ACTIVE'
        ]);
        Pet::create([
            'unity' => 1,
            'user' => 4,
            'avatar' => 'https://api.kando-so.com.br/storage/images/pets/pet-4.jpg',
            'name' => 'Boltz',
            'type' => 1,
            'breed' => 16,
            'gender' => 'MALE',
            'size' => 2,
            'type_fur' => 5,
            'date_birth' => '2018-07-02',
            'castrated' => false,
            'ration_brand' => 'Special Dog',
            'times_day' => 2,
            'amount_time' => 100,
            'types_food' => 'Ração Seca',
            'obs_food' => 'Dar apenas ração',
            'sachet' => true,
            'perfume' => true,
            'ornament' => true,
            'alive' => true,
            'pool' => true,
            'obs_general' => 'Tratar com cuidado',
            'vet_name' => 'Jéssica',
            'vet_phone' => '(44) 9 9999-9999',
            'obs_medical' => 'Cuidar para não ter problemas no coração',
            'vaccination_carter' => '',
            'behavior' => 1,
            'status' => 'ACTIVE'
        ]);
    }
}
