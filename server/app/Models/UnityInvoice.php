<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnityInvoice extends Model
{
    protected $table = 'unity_invoices';


    protected $fillable = [
        'invoice_key',
        'number',
        'date',
        'price',
        'type',
        'status',
        'unity_id'
    ];
}
