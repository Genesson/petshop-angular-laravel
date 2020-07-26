<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\UnityRoom;

class UnityRoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            return UnityRoom::where('unity', auth()->user()->unity[0]['unity'])->get();
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
            $room = UnityRoom::where([['number', $request['number']], ['unity', auth()->user()->unity[0]['unity']]])->exists();
            if (!$room) {
                $request['unity'] = auth()->user()->unity[0]['unity'];
                $unityRoom = UnityRoom::create($request->all());
                return $unityRoom;
            } else {
                return response()->json(['erro' => true, 'message' => 'Já existe um quarto com este número!'], 500);
            }
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
        return UnityRoom::findOrFail($id);
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
        $unityRoom = UnityRoom::findOrFail($id);
        $unityRoom->update($request->all());
        return $unityRoom;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $unityRoom = UnityRoom::findOrFail($id);
        $unityRoom->delete();
        return $unityRoom;
    }
}
