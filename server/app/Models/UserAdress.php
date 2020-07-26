<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAdress extends Model
{
    protected $fillable = [
        'user',
        'zipcode',
        'street',
        'number',
        'district',
        'complement',
        'country',
        'province',
        'city'
    ];

    public function city()
    {
        return $this->hasMany(City::class, 'id', 'city');
    }

    public function province()
    {
        return $this->hasMany(Province::class, 'id', 'province');
    }
}
