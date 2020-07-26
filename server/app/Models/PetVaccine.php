<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetVaccine extends Model
{
    protected $fillable = [
        'unity',
        'pet',
        'description',
        'date'
    ];

    public function pet()
    {
        return $this->hasMany(Pet::class, 'id', 'pet');
    }
}
