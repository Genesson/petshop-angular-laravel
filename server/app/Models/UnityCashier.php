<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityCashier extends Model
{
    protected $fillable = [
        'code',
        'unity',
        'user',
        'value',
        'amount',
        'note',
        'operation',
        'action',
        'status'
    ];
}
