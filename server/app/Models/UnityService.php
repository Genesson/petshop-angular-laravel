<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityService extends Model
{
    protected $fillable = [
        'unity',
        'user',
        'service',
        'size',
        'breed',
        'type_fur',
        'region',
        'description',
        'modules',
        'period',
        'time',
        'price',
        'type',
        'status'
    ];

    public function services()
    {
        return $this->belongsTo(UnityService::class, 'id', 'service');
    }

    public function sizes()
    {
        return $this->hasMany(PetSize::class, 'id', 'size');
    }

    public function breeds()
    {
        return $this->hasMany(PetBreed::class, 'id', 'breed');
    }

    public function type_furs()
    {
        return $this->hasMany(PetTypeFur::class, 'id', 'type_fur');
    }

    public function regions()
    {
        return $this->hasMany(UnityRegion::class, 'id', 'region');
    }

    public function user()
    {
        return $this->hasMany(User::class, 'id', 'user');
    }

    public function category()
    {
        return $this->hasMany(UnityCategory::class, 'module', 'type');
    }
}
