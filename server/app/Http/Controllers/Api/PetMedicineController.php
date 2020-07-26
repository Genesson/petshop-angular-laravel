<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PetMedicine;
use Illuminate\Http\Request;

class PetMedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PetMedicine::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request['date'] = date('Y-m-d', strtotime($request->date));
        $PetMedicine = PetMedicine::create($request->all());
        return $PetMedicine;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return PetMedicine::where('pet', $id)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request['date'] = date('Y-m-d', strtotime($request->date));
        $PetMedicine = PetMedicine::findOrFail($id);
        $PetMedicine->update($request->all());
        return $PetMedicine;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $PetMedicine = PetMedicine::findOrFail($id);
        $PetMedicine->delete();
        return $PetMedicine;
    }
}
