<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserUnity extends Model
{
    protected $fillable = [
        'unity',
        'user',
        'permission',
        'status'
    ];

    public function unity()
    {
        $unity = $this->hasMany(Unity::class, 'id', 'unity');
        return $unity;
    }
}
