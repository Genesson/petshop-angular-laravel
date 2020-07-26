<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetMedicine extends Model
{
    protected $fillable = [
        'pet',
        'description',
        'date',
        'validity'
    ];
}
