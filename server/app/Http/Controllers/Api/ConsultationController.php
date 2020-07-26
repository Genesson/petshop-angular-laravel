<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use Exception;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $consultations = Consultation::join('pets', 'consultations.pet', '=', 'pets.id')
                                ->where('pets.unity', auth()->user()->unity[0]['unity'])
                                ->where('consultations.status', 1)
                                ->get();
            foreach ($consultations as $consultation) {
                $consultation->pet = ($consultation->pets()->first()) ? $consultation->pets()->first() : [];
                $consultation->pet->user = ($consultation->pet->tutor()->first()) ? $consultation->pet->tutor()->first() : [];
                $consultation->pet->type = ($consultation->pet->type()->first()) ? $consultation->pet->type()->first() : [];
                $consultation->pet->breed = ($consultation->pet->breed()->first()) ? $consultation->pet->breed()->first() : [];
                $consultation->pet->size = ($consultation->pet->size()->first()) ? $consultation->pet->size()->first() : [];
                $consultation->pet->type_fur = ($consultation->pet->type_fur()->first()) ? $consultation->pet->type_fur()->first() : [];
            }

            return response()->json($consultations ?? [], $consultations ? 200 : 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $consultation = Consultation::create($request->all());
            foreach ($request->treatments as $value) {
                $consultation->treatments()->create($value);
            }
            $consultation->pet = ($consultation->pets()->first()) ? $consultation->pets()->first() : [];
            $consultation->pet->user = ($consultation->pet->tutor()->first()) ? $consultation->pet->tutor()->first() : [];
            $consultation->pet->type = ($consultation->pet->type()->first()) ? $consultation->pet->type()->first() : [];
            $consultation->pet->breed = ($consultation->pet->breed()->first()) ? $consultation->pet->breed()->first() : [];
            $consultation->pet->size = ($consultation->pet->size()->first()) ? $consultation->pet->size()->first() : [];
            $consultation->pet->type_fur = ($consultation->pet->type_fur()->first()) ? $consultation->pet->type_fur()->first() : [];
            return $consultation;
        } catch (Exception $e) {
            return response()->json(['erro' => true, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Consultation $consultation
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $consultations = Consultation::where([['pet', $id], ['status', 1]])->get();
        foreach ($consultations as $consultation) {
            $consultation->pet = ($consultation->pets()->first()) ? $consultation->pets()->first() : [];
            $consultation->pet->user = ($consultation->pet->tutor()->first()) ? $consultation->pet->tutor()->first() : [];
            $consultation->pet->type = ($consultation->pet->type()->first()) ? $consultation->pet->type()->first() : [];
            $consultation->pet->breed = ($consultation->pet->breed()->first()) ? $consultation->pet->breed()->first() : [];
            $consultation->pet->size = ($consultation->pet->size()->first()) ? $consultation->pet->size()->first() : [];
            $consultation->pet->type_fur = ($consultation->pet->type_fur()->first()) ? $consultation->pet->type_fur()->first() : [];
        }

        return response()->json($consultations ?? [], $consultations ? 200 : 500);

        /*$consultation = Consultation::with(["pet.user", "treatments" => function ($q) {
            $q->where('status', 1);
        }])->find($id);
        return response()->json($consultation ?? [], $consultation ? 200 : 404);*/
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Consultation $consultation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Consultation $consultation)
    {

        try {
            $consultation->update($request->all());

            $dontDeleteTreatments = [];
            foreach ($request->treatments as $value) {
                if (isset($value['id'])) {
                    $treatment = $consultation->treatments()->find($value['id']);
                    $treatment->update($value);
                } else {
                    $treatment = $consultation->treatments()->create($value);
                }

                $dontDeleteTreatments[] = $treatment->id;
            }

            $deleteTreatments = $consultation->treatments()->whereNotIn('id', $dontDeleteTreatments)->get();

            foreach ($deleteTreatments as $value) {
                $value->status = 0;
                $value->save();
            }

            return $consultation;
        } catch (Exception $e) {
            return response()->json(['erro' => true, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Consultation $consultation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Consultation $consultation)
    {
        try {
            $consultation->status = 0;
            $consultation->save();
            foreach ($consultation->treatments as $value) {
                $value->status = 0;
                $value->save();
            }
            return $consultation;
        } catch (Exception $e) {
            return response()->json(['erro' => true, 'message' => $e->getMessage()], 500);
        }
    }
}
