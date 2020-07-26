<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\PetBehavior;

class PetBehaviorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            return PetBehavior::where('unity', auth()->user()->unity[0]['unity'])->get();
        }

        if ($request['unity']) {
            return PetBehavior::where('unity', $request['unity'])->get();
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
            $petBehavior = PetBehavior::create($request->all());
            return $petBehavior;
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
        return PetBehavior::findOrFail($id);
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
        $petBehavior = PetBehavior::findOrFail($id);
        $petBehavior->update($request->all());
        return $petBehavior;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $petBehavior = PetBehavior::findOrFail($id);
        $petBehavior->delete();
        return $petBehavior;
    }
}
