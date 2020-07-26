<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetEvaluation extends Model
{
    protected $fillable = [
        'pet',
        'first_date',
        'description',
        'liked_pool',
        'pool_obs',
        'hydration',
        'hydration_obs',
        'pee_poop',
        'behavior',
        'frequency',
        'reason',
        'test'
    ];

    public function pet()
    {
        return $this->hasMany(Pet::class, 'id', 'pet');
    }
}
