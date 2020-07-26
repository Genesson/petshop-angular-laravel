<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Package extends Model
{

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Model $obj) {
            if ($obj->service_type) {
                $obj->service_type = serialize($obj->service_type);
            }
        });

        static::updating(function (Model $obj) {
            if ($obj->service_type) {
                $obj->service_type = serialize($obj->service_type);
            }
        });
    }

    protected $fillable = [
        "unity",
        "service",
        "name",
        "days",
        "price",
        "promotional_days",
        "promotional_price",
        "promotional_percent",
        "toast_before",
        "toast_name",
        "package_until",
        "status"
    ];
}
