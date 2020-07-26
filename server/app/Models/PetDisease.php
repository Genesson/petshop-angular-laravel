<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetDisease extends Model
{
    protected $fillable = [
        'pet',
        'description'
    ];
}
