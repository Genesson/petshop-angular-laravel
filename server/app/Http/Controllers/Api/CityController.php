<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\City;

class CityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return City::where('province', $id)->get();
    }
}
