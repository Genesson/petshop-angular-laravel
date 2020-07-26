<?php

use App\Models\ProductProvider;
use Illuminate\Database\Seeder;

class ProductProviderTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductProvider::create([
            'unity' => 1,
            'description' => 'Fornecedor Geral',
            'status' => 1,
            'cod_erp' => null
        ]);
    }
}
