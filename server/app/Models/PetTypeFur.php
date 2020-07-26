<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetTypeFur extends Model
{
    protected $fillable = [
        'unity',
        'type',
        'description'
    ];
}
