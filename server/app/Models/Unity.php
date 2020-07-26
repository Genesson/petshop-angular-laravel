<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unity extends Model
{
    protected $fillable = [
        'razao_social',
        'fantasy',
        'email',
        'cnpj',
        'ie',
        'color',
        'nfe',
        'logo',
        'zipcode',
        'street',
        'number',
        'district',
        'country',
        'province',
        'city',
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'hour_sunday_in',
        'hour_sunday_interval_in',
        'hour_sunday_interval_out',
        'hour_sunday_out',
        'hour_monday_in',
        'hour_monday_interval_in',
        'hour_monday_interval_out',
        'hour_monday_out',
        'hour_tuesday_in',
        'hour_tuesday_interval_in',
        'hour_tuesday_interval_out',
        'hour_tuesday_out',
        'hour_wednesday_in',
        'hour_wednesday_interval_in',
        'hour_wednesday_interval_out',
        'hour_wednesday_out',
        'hour_thursday_in',
        'hour_thursday_interval_in',
        'hour_thursday_interval_out',
        'hour_thursday_out',
        'hour_friday_in',
        'hour_friday_interval_in',
        'hour_friday_interval_out',
        'hour_friday_out',
        'hour_saturday_in',
        'hour_saturday_interval_in',
        'hour_saturday_interval_out',
        'hour_saturday_out',
        'status'
    ];

    public function city()
    {
        return $this->belongsTo(City::class, 'city', 'id');
    }

    public function categories()
    {
        return $this->belongsTo(UnityCategory::class, 'unity', 'id');
    }

    public function services()
    {
        return $this->belongsTo(UnityService::class, 'unity', 'id');
    }
}
