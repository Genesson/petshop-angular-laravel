<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PetVaccine;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PetVaccineController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $date = new Carbon;
            $PetVaccines = PetVaccine::where('unity', auth()->user()->unity[0]['unity'])
                            ->whereMonth('date', Date("m"))
                            ->orderBy('date', 'asc')
                            ->get();
            foreach ($PetVaccines as $PetVaccine) {
                $PetVaccine->validity = ($date > $PetVaccine->date) ? 'Vacida vencida' : 'Vacida a vencer';
                $PetVaccine->pet = ($PetVaccine->pet()->first()) ? $PetVaccine->pet()->first() : [];
                $PetVaccine->pet->user = ($PetVaccine->pet->user()->first()) ? $PetVaccine->pet->user()->first() : [];
                $PetVaccine->pet->type = ($PetVaccine->pet->type()->first()) ? $PetVaccine->pet->type()->first() : [];
                $PetVaccine->pet->breed = ($PetVaccine->pet->breed()->first()) ? $PetVaccine->pet->breed()->first() : [];
                $PetVaccine->pet->size = ($PetVaccine->pet->size()->first()) ? $PetVaccine->pet->size()->first() : [];
                $PetVaccine->pet->type_fur = ($PetVaccine->pet->type_fur()->first()) ? $PetVaccine->pet->type_fur()->first() : [];
                $PetVaccine->pet->behavior = ($PetVaccine->pet->behavior()->first()) ? $PetVaccine->pet->behavior()->first() : [];
            }
            return $PetVaccines;
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
        if (isset(auth()->user()->unity[0]['unity'])) {
            $request['unity'] = auth()->user()->unity[0]['unity'];
            $request['date'] = date('Y-m-d', strtotime($request->date));
            $PetVaccine = PetVaccine::create($request->all());
            return $PetVaccine;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return PetVaccine::where('pet', $id)->get();
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
        $PetVaccine = PetVaccine::findOrFail($id);
        $PetVaccine->update($request->all());
        return $PetVaccine;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $PetVaccine = PetVaccine::findOrFail($id);
        $PetVaccine->delete();
        return $PetVaccine;
    }
}
