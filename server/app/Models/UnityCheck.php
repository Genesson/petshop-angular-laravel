<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityCheck extends Model
{
    protected $fillable = [
      'unity',
      'description',
      'type',
      'hour',
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'status'
    ];
}
