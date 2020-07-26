<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductProvider extends Model
{
    protected $fillable = [
        'unity',
        'description',
        'status',
        'cod_erp'
    ];
}
