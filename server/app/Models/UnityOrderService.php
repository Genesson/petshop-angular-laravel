<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityOrderService extends Model
{
    protected $fillable = [
        'order',
        'service',
        'quantity',
        'amount'
    ];

    public function service()
    {
        return $this->hasMany(UnityService::class, 'id', 'service');
    }
}
