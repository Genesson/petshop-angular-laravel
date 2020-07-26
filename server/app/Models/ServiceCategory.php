<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceCategory extends Model
{
     protected $fillable = [
        'category_id',
        'postage_id',
        'fur_id',
        'estimated_time',
        'price',
        'unity_id',
        'status',
    ];
}
