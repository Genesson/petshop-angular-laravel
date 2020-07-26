<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'unity',
        'user',
        'pet',
        'service',
        'category',
        'room',
        'package',
        'date',
        'hour',
        'time',
        'date_checkin',
        'hour_checkin',
        'date_checkout',
        'hour_checkout',
        'daily',
        'period',
        'custom',
        'transport',
        'transport_id',
        'finished_at',
        'status'
    ];

    public function service()
    {
        return $this->hasMany(UnityService::class, 'id', 'service');
    }

    public function category()
    {
        return $this->hasMany(UnityCategory::class, 'id', 'category');
    }

    public function pet()
    {
        return $this->hasMany(Pet::class, 'id', 'pet');
    }

    public function user()
    {
        return $this->hasMany(User::class, 'id', 'user');
    }

    public function daycare()
    {
        return $this->hasMany(Daycare::class, 'schedule', 'id');
    }

    public function order()
    {
        return $this->hasMany(UnityOrder::class, 'schedule', 'id');
    }
}
