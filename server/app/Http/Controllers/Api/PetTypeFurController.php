<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\PetTypeFur;

class PetTypeFurController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            return PetTypeFur::where('unity', auth()->user()->unity[0]['unity'])->get();
        }

        if ($request['unity']) {
            return PetTypeFur::where('unity', $request['unity'])->get();
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
            $petTypeFur = PetTypeFur::create($request->all());
            return $petTypeFur;
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
        return PetTypeFur::findOrFail($id);
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
        $petTypeFur = PetTypeFur::findOrFail($id);
        $petTypeFur->update($request->all());
        return $petTypeFur;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $petTypeFur = PetTypeFur::findOrFail($id);
        $petTypeFur->delete();
        return $petTypeFur;
    }
}
