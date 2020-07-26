<?php

namespace App\Http\Controllers;

use Artisan;

class CleanController extends Controller
{
    public function index()
    {
        Artisan::call('cache:clear');
        Artisan::call('optimize');
        Artisan::call('route:cache');
        Artisan::call('route:clear');
        Artisan::call('view:clear');
        Artisan::call('config:cache');
        return '<h1>Clear Config cleared</h1>';
    }
}
