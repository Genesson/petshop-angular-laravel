<?php

use App\Models\User;
use App\Models\UserAdress;
use App\Models\UserUnity;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Administrador Kando',
            'phone' => '(44) 9 9999-9999',
            'email' => 'admin@kando.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'ADMIN'
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-female.jpg',
            'name' => 'Juliane',
            'phone' => '(44) 9 9999-9999',
            'email' => 'ju@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 2,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Leonardo',
            'phone' => '(44) 9 9999-9999',
            'email' => 'leonardo@gmail.com.br',
            'password' => Hash::make('ex007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 3,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'André da Silva',
            'phone' => '(44) 9 9999-9999',
            'email' => 'andre@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 4,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Goiais da Cunha',
            'phone' => '(44) 9 9999-9999',
            'email' => 'goiais@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 5,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Pedro Alcantara',
            'phone' => '(44) 9 9999-9999',
            'email' => 'pedro@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 6,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'José Bonifacio',
            'phone' => '(44) 9 9999-9999',
            'email' => 'jose@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 7,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Cláudio da Silva',
            'phone' => '(44) 9 9999-9999',
            'email' => 'claudio@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 8,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-female.jpg',
            'name' => 'Gertrudes',
            'phone' => '(44) 9 9999-9999',
            'email' => 'gertrudes@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 9,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-female.jpg',
            'name' => 'Jéssica',
            'phone' => '(44) 9 9999-9999',
            'email' => 'jessica@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 10,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-female.jpg',
            'name' => 'Julia',
            'phone' => '(44) 9 9999-9999',
            'email' => 'julia@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 11,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-female.jpg',
            'name' => 'Catarina',
            'phone' => '(44) 9 9999-9999',
            'email' => 'catarina@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 12,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Fernando',
            'phone' => '(44) 9 9999-9999',
            'email' => 'fernando@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 13,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Felipe',
            'phone' => '(44) 9 9999-9999',
            'email' => 'felipe@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 14,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Domingos',
            'phone' => '(44) 9 9999-9999',
            'email' => 'domingos@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 15,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-female.jpg',
            'name' => 'Susane',
            'phone' => '(44) 9 9999-9999',
            'email' => 'susane@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 15,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-female.jpg',
            'name' => 'Fani',
            'phone' => '(44) 9 9999-9999',
            'email' => 'fani@7cliques.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'CLIENT'
        ]);
        UserAdress::create([
            'user' => 16,
            'zipcode' => '859500-000',
            'street' => 'Rua A',
            'number' => '1000',
            'district' => 'Centro',
            'complement' => '',
            'country' => 1,
            'province' => 18,
            'city' => 2853
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Dono Soulpet',
            'phone' => '(44) 9 9999-9999',
            'email' => 'soupet@kando.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'OWNER'
        ]);
        User::create([
            'avatar' => 'https://api.kando-so.com.br/storage/images/users/avatar-male.jpg',
            'name' => 'Funcionário Soulpet',
            'phone' => '(44) 9 9999-9999',
            'email' => 'funcionario@kando.com.br',
            'password' => Hash::make('cli007'),
            'role' => 'EMPLOYEE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 1,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 2,
            'user' => 1,
            'permission' => 1,
            'status' => 'INACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 2,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 3,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 4,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 5,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 6,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 7,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 8,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 9,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 10,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 11,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 12,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 13,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 14,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 15,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
        UserUnity::create([
            'unity' => 1,
            'user' => 16,
            'permission' => 1,
            'status' => 'ACTIVE'
        ]);
    }
}
