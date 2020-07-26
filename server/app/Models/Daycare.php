<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Daycare extends Model
{
    protected $fillable = [
        "pet",
        "schedule",
        "action",
        "presence",
        "presence_date",
        "first_meat",
        "first_meat_date",
        "second_meat",
        "second_meat_date",
        "peed",
        "peed_date",
        "pooped",
        "pooped_date",
        "observation",
        "observation_date",
        "out",
        "out_date",
        "status"
    ];

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
}
