<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\PetBreed;

class PetBreedController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $petBreeds = PetBreed::where(['unity' => auth()->user()->unity[0]['unity']])->get();
            foreach ($petBreeds as $petBreed) {
                $petBreed->type = ($petBreed->type()->first()) ? $petBreed->type()->first() : [];
            }
            return $petBreeds;
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
            $request['type'] = $request->type['id'];
            $petBreed = PetBreed::create($request->all());

            $petBreed->type = ($petBreed->type()->first()) ? $petBreed->type()->first() : [];
            return $petBreed;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $petBreeds = PetBreed::where(['unity' => auth()->user()->unity[0]['unity'], 'type' => $id])->get();
            foreach ($petBreeds as $petBreed) {
                $petBreed->type = ($petBreed->type()->first()) ? $petBreed->type()->first() : [];
            }
            return $petBreeds;
        }

        if ($request['unity']) {
            $petBreeds = PetBreed::where(['unity' => $request['unity'], 'type' => $id])->get();
            foreach ($petBreeds as $petBreed) {
                $petBreed->type = ($petBreed->type()->first()) ? $petBreed->type()->first() : [];
            }
            return $petBreeds;
        }
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
        $petBreed = PetBreed::findOrFail($id);

        $request['type'] = $request->type['id'];
        $petBreed->update($request->all());

        $petBreed->type = ($petBreed->type()->first()) ? $petBreed->type()->first() : [];
        return $petBreed;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $petBreed = PetBreed::findOrFail($id);
        $petBreed->delete();
        return $petBreed;
    }
}
