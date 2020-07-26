<?php

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Permission::create([
            'unity' => 1,
            'description' => 'Administrador',
            'pets' => true,
            'daily' => true,
            'users' => true,
            'settings' => true,
            'cashier' => true,
            'vet' => true,
            'reports' => true,
            'products' => true,
            'tutors' => true,
            'units' => true,
            'invoices' => true,
            'status' => true
        ]);
    }
}
