<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\PetType;

class PetTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            return PetType::where('unity', auth()->user()->unity[0]['unity'])->get();
        }

        if ($request['unity']) {
            return PetType::where('unity', $request['unity'])->get();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $request['unity'] = auth()->user()->unity[0]['unity'];
            $petType = PetType::create($request->all());
            return $petType;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return PetType::findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $petType = PetType::findOrFail($id);
        $petType->update($request->all());
        return $petType;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $petType = PetType::findOrFail($id);
        $petType->delete();
        return $petType;
    }
}
