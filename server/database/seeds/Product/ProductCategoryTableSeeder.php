<?php

use App\Models\ProductCategory;
use Illuminate\Database\Seeder;

class ProductCategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductCategory::create([
            'unity' => 1,
            'description' => 'Gerais',
            'status' => 1
        ]);
    }
}
