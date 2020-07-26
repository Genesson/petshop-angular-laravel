<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityExceptionDate extends Model
{
    protected $fillable = [
        'unity',
        'description',
        'date_start',
        'date_end',
        'status'
    ];
}
