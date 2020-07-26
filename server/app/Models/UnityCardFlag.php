<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityCardFlag extends Model
{
    protected $fillable = [
        'unity',
        'description',
        'status'
    ];
}
