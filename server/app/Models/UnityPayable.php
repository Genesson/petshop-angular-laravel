<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityPayable extends Model
{
    protected $fillable = [
        'quota',
        'value',
        'expiration',
        'payment_at'
    ];
}
