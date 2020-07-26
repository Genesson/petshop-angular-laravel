<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PetPackage extends Model
{
    protected $fillable = [
        'pet',
        'service',
        'quantity_days',
        'interval_days',
        'weekdays',
        'with_month',
        'start_date',
        'week_days',
        'intervals',
        'transport',
        'transport_id',
        'status'
    ];
}
