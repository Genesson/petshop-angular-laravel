<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Pet;
use App\Models\User;

use Carbon\Carbon;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if (isset(auth()->user()->id)) {
            $user = User::where('id', auth()->user()->id)->first();
            if ($user->role === 'CLIENT') {
                $pets = Pet::where('user', auth()->user()->id)->get();
            } else {
                $pets = Pet::where('unity', auth()->user()->unity[0]['unity'])->get();
            }
            foreach ($pets as $pet) {
                $pet->user = ($pet->user()->first()) ? $pet->user()->first() : [];
                $pet->user['pets'] = ($pet->user->pets()->get()) ? $pet->user->pets()->get() : [];
                $pet->type = ($pet->type()->first()) ? $pet->type()->first() : [];
                $pet->breed = ($pet->breed()->first()) ? $pet->breed()->first() : [];
                $pet->size = ($pet->size()->first()) ? $pet->size()->first() : [];
                $pet->type_fur = ($pet->type_fur()->first()) ? $pet->type_fur()->first() : [];
                $pet->behavior = ($pet->behavior()->first()) ? $pet->behavior()->first() : [];
            }
            return $pets;
        } else {
            return response()->json(['erro' => true, 'message' => 'Não autenticado']);
        }
    }

    public function loadPerTutor($id)
    {
        $pets = Pet::where('user', $id)->get();
        return $pets;
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
            $request['unity'] = isset($request->unity) ? $request->unity : auth()->user()->unity[0]['unity'];;
            $request['user'] = isset($request->user) ? $request->user : 0;
            $request['date_birth'] = ($request->date_birth) ? date('Y-m-d', strtotime(Carbon::parse($request->date_birth))) : null;
            $request['date_cio'] = ($request->date_cio) ? date('Y-m-d', strtotime(Carbon::parse($request->date_cio))) : null;
            $request['date_evaluation'] = ($request->date_evaluation) ? date('Y-m-d', strtotime(Carbon::parse($request->date_evaluation))) : null;
            $pet = Pet::create($request->all());
            return response()->json($pet, 200);
        } catch (Exception $e) {
            return response()->json(['erro' => true, 'message' => $e->getMessage()], 500);
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
        $pet = Pet::findOrFail($id);
        $pet['user'] = ($pet->user()->first()) ? $pet->user()->first() : [];
        $pet['type'] = ($pet->type()->first()) ? $pet->type()->first() : [];
        $pet['breed'] = ($pet->breed()->first()) ? $pet->breed()->first() : [];
        $pet['size'] = ($pet->size()->first()) ? $pet->size()->first() : [];
        $pet['type_fur'] = ($pet->type_fur()->first()) ? $pet->type_fur()->first() : [];
        $pet['behavior'] = ($pet->behavior()->first()) ? $pet->behavior()->first() : [];
        return $pet;
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
        try {
            $request['date_birth'] = ($request->date_birth) ? date('Y-m-d', strtotime(Carbon::parse($request->date_birth))) : null;
            $request['date_cio'] = ($request->date_cio) ? date('Y-m-d', strtotime(Carbon::parse($request->date_cio))) : null;
            $request['date_evaluation'] = ($request->date_evaluation) ? date('Y-m-d', strtotime(Carbon::parse($request->date_evaluation))) : null;

            $pet = Pet::findOrFail($id);
            $pet->update($request->all());
            return response()->json($pet, 200);
        } catch (Exception $e) {
            return response()->json(['erro' => true, 'message' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $pet = Pet::findOrFail($id);
        $pet->delete();
        return $pet;
    }
}
