<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityRoom extends Model
{
    protected $fillable = [
        'unity',
        'description',
        'number',
        'status'
    ];
}
