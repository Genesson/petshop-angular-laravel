<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityOrderProduct extends Model
{
    protected $fillable = [
        'order',
        'product',
        'quantity',
        'amount'
    ];

    public function product()
    {
        return $this->hasMany(Product::class, 'id', 'product');
    }
}
