<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pet extends Model
{
    protected $fillable = [
        'unity',
        'user',
        'avatar',
        'name',
        'type',
        'breed',
        'gender',
        'size',
        'type_fur',
        'date_birth',
        'castrated',
        'ration_brand',
        'times_day',
        'amount_time',
        'types_food',
        'obs_food',
        'sachet',
        'perfume',
        'ornament',
        'alive',
        'pool',
        'obs_general',
        'vet_name',
        'vet_phone',
        'obs_medical',
        'vaccination_carter',
        'case_emergency',
        'case_symptoms',
        'date_cio',
        'date_evaluation',
        'behavior',
        'has_services',
        'special_attention',
        'attention',
        'obs_alert',
        'status'
    ];

    public function user()
    {
        return $this->hasMany(User::class, 'id', 'user');
    }

    public function tutor()
    {
        return $this->hasMany(User::class, 'id', 'user');
    }

    public function type()
    {
        return $this->hasMany(PetType::class, 'id', 'type');
    }

    public function breed()
    {
        return $this->hasMany(PetBreed::class, 'id', 'breed');
    }

    public function size()
    {
        return $this->hasMany(PetSize::class, 'id', 'size');
    }

    public function type_fur()
    {
        return $this->hasMany(PetTypeFur::class, 'id', 'type_fur');
    }

    public function behavior()
    {
        return $this->hasMany(PetBehavior::class, 'id', 'behavior');
    }

    public function consultations()
    {
        return $this->hasMany(Consultation::class);
    }
}
