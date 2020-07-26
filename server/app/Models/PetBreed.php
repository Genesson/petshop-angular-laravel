<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetBreed extends Model
{
    protected $fillable = [
        'unity',
        'type',
        'description'
    ];

    public function type()
    {
        return $this->hasMany(PetType::class, 'id', 'type');
    }
}
