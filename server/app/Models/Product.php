<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'cod_erp',
        'unit',
        'description',
        'ean',
        'sku',
        'origin',
        'type',
        'ncm',
        'cfop',
        'cest',
        'price_sale',
        'unity',
        'quantity_stock',
        'net_weight',
        'gross_weight',
        'type_pack',
        'width',
        'heigth',
        'length',
        'description_comp',
        'image',
        'category',
        'brand',
        'manufacturer',
        'provider',
        'cod_product',
        'unit_per_box',
        'price_cost',
        'line_product',
        'guarantee',
        'situation',
        'gtin',
        'unit_tributary',
        'conversion',
        'ipi',
        'value_ipi'
    ];

    public function category()
    {
        return $this->hasMany(ProductCategory::class, 'id', 'category');
    }

    public function provider()
    {
        return $this->hasMany(ProductProvider::class, 'id', 'provider');
    }
}
