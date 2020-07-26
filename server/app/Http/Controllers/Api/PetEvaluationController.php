<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PetEvaluation;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PetEvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PetEvaluation::all();
    }

    public function loadPerPet($pet)
    {
        $pet_evaluations = PetEvaluation::where('pet', $pet)->get();
        foreach ($pet_evaluations as $pet_evaluation) {
            $pet_evaluation['pet'] = ($pet_evaluation->pet()->first()) ? $pet_evaluation->pet()->first() : [];
        }
        return $pet_evaluations;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request['pet'] = $request->pet['id'];
        $request['first_date'] = date('Y-m-d', strtotime(Carbon::parse($request->date_birth)));
        $PetEvaluation = PetEvaluation::create($request->all());
        return $PetEvaluation;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return PetEvaluation::findOrFail($id);
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
        $request['pet'] = $request->pet['id'];
        $request['first_date'] = date('Y-m-d', strtotime($request->date_birth));
        $PetEvaluation = PetEvaluation::findOrFail($id);
        $PetEvaluation->update($request->all());
        return $PetEvaluation;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $PetEvaluation = PetEvaluation::findOrFail($id);
        $PetEvaluation->delete();
        return $PetEvaluation;
    }
}
