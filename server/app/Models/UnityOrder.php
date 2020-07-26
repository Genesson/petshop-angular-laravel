<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityOrder extends Model
{
    protected $fillable = [
        'unity',
        'user',
        'pet',
        'schedule',
        'payment_form',
        'amount',
        'discount',
        'receivement_at',
        'status'
    ];

    public function products()
    {
        return $this->hasMany(UnityOrderProduct::class, 'order', 'id');
    }

    public function services()
    {
        return $this->hasMany(UnityOrderService::class, 'order', 'id');
    }

    public function pet()
    {
        return $this->hasMany(Pet::class, 'id', 'pet');
    }
}
