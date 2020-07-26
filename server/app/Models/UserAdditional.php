<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAdditional extends Model
{
    protected $fillable = [
        'user',
        'found_us',
        'additional_one',
        'additional_two',
        'additional_three',
        'obs_general',
        'has_services',
        'special_attention',
        'attention',
        'obs_alert'
    ];
}
