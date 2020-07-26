<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{

    protected $fillable = [
        "pet",
        "current_weight",
        "temperature",
        "anamnesis",
        "diagnosis",
        "exams",
        "status",
    ];

    public function treatments()
    {
        return $this->hasMany(Treatment::class);
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function pets()
    {
        return $this->hasMany(Pet::class, 'id', 'pet');
    }
}
