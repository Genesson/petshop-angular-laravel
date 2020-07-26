<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityReceivable extends Model
{
    protected $fillable = [
        'unity',
        'order',
        'quota',
        'value',
        'payment_with',
        'flag',
        'voucher_number',
        'cpf',
        'cpf_number',
        'expiration',
        'last',
        'receivement_at'
    ];

    public function order()
    {
        return $this->hasMany(UnityOrder::class, 'id', 'order');
    }

    public function flag()
    {
        return $this->hasMany(UnityCardFlag::class, 'id', 'flag');
    }
}
