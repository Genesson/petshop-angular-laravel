<?php

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Product::create([
            'unit' => 1,
            'description' => 'Vermifugo Ceva Petzi Gatos 600 mg - 4 Comprimidos',
            'type' => 1,
            'cfop' => 5102,
            'price_sale' => 24.38,
            'unity' => 'UN',
            'quantity_stock' => 10,
            'type_pack' => 1,
            'width' => 9,
            'heigth' => 2,
            'length' => 14,
            'description_comp' => 'Seus componentes são de ação eficaz na prevenção das larvas que atacam seu animal, através das glândulas mamárias, na pele ou ingeridas, ocasionando a morte em filhotes.',
            'image' => 'https://api.kando-so.com.br/storage/images/products/vermifugo.jpg',
            'brand' => 3,
            'manufacturer' => 1,
            'unit_per_box' => 12,
            'price_cost' => 14.38,
            'line_product' => 1,
            'guarantee' => 60,
            'situation' => 1,
            'category' => 1,
            'provider' => 1
        ]);
        Product::create([
            'unit' => 1,
            'description' => 'Ração Premier Pet Ambientes Internos Cães Filhotes Frango e Salmão',
            'type' => 1,
            'cfop' => 5102,
            'price_sale' => 175.90,
            'unity' => 'UN',
            'quantity_stock' => 40,
            'type_pack' => 1,
            'width' => 90,
            'heigth' => 22,
            'length' => 140,
            'description_comp' => 'Mantem a pelagem bonita e saudável, por ser rico em ácidos graxos essenciais Omega 3 e Omega 6.',
            'image' => 'https://api.kando-so.com.br/storage/images/products/racao.jpg',
            'brand' => 2,
            'manufacturer' => 4,
            'unit_per_box' => 1,
            'price_cost' => 125.38,
            'line_product' => 1,
            'guarantee' => 60,
            'situation' => 1,
            'category' => 1,
            'provider' => 1
        ]);
    }
}
