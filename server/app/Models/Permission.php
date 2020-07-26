<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $fillable = [
        'unity',
        'description',
        'pets',
        'daily',
        'users',
        'settings',
        'cashier',
        'vet',
        'reports',
        'products',
        'tutors',
        'units',
        'invoices',
        'status'
    ];
}
