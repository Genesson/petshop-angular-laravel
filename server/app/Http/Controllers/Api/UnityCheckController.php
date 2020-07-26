<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Models\UnityCheck;

class UnityCheckController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $unityChecks = UnityCheck::where('unity', auth()->user()->unity[0]['unity'])->get();
            foreach ($unityChecks as $unityCheck) {
                $unityCheck->hour = Carbon::parse($unityCheck->hour);
            }
            return $unityChecks;
        }
    }

    public function loadPerUnity($id)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $unitChecks = UnityCheck::where('unity', auth()->user()->unity[0]['unity'])->get();
            foreach ($unitChecks as $unityCheck) {
                $unityCheck->hour = Carbon::parse($unityCheck->hour);
            }
            return $unitChecks;
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
            $request['description'] = ucfirst($request->type) . ': ' . date('H:m', strtotime($request->hour));
            $request['hour'] = Carbon::parse($request->hour);
            $unityCheck = UnityCheck::create($request->all());
            $unityCheck->hour = Carbon::parse($unityCheck->hour);
            return $unityCheck;
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
        if (isset(auth()->user()->unity[0]['unity'])) {
            return UnityCheck::findOrFail($id);
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
        if (isset(auth()->user()->unity[0]['unity'])) {
            $request['unity'] = auth()->user()->unity[0]['unity'];
            $request['description'] = ucfirst($request->type) . ': ' . date('H:m', strtotime($request->hour));
            $request['hour'] = Carbon::parse($request->hour);
            $unityCheck = UnityCheck::findOrFail($id);
            $unityCheck->update($request->all());
            $unityCheck->hour = Carbon::parse($unityCheck->hour);
            return $unityCheck;
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
        if (isset(auth()->user()->unity[0]['unity'])) {
            $unityCheck = UnityCheck::findOrFail($id);
            $unityCheck->delete();
            return $unityCheck;
        }
    }
}
