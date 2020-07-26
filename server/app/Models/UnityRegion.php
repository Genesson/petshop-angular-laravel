<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityRegion extends Model
{
    protected $fillable = [
        'unity',
        'description',
        'status'
    ];

    public function districts()
    {
        return $this->hasMany(UnityDistrict::class, 'region', 'id');
    }
}
