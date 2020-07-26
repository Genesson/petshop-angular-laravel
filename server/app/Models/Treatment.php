<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    protected $fillable = [
        "consultation_id",
        "remedy_name",
        "number_of_days",
        "use_type",
        "times_day",
        "amount",
        "unity_type",
        "observations",
        "status"
    ];

    public function consultation()
    {
        return $this->belongsTo(Consultation::class);
    }
}
