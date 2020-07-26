<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

use App\Models\UnityPriceVariation;

class UnityPriceVariationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $unityPriceVariations = UnityPriceVariation::where('unity', auth()->user()->unity[0]['unity'])->get();
            foreach ($unityPriceVariations as $unityPriceVariation) {
                $unityPriceVariation->start = Carbon::parse($unityPriceVariation->start);
                $unityPriceVariation->end = Carbon::parse($unityPriceVariation->end);
                $unityPriceVariation->moduleObj = ($unityPriceVariation->module()->first()) ? $unityPriceVariation->module()->first() : [];
            }
            return $unityPriceVariations;
        }
    }

    public function loadPerUnity($id)
    {
        $unityPriceVariations = UnityPriceVariation::where('unity', $id)->get();
        foreach ($unityPriceVariations as $unityPriceVariation) {
            $unityPriceVariation->start = Carbon::parse($unityPriceVariation->start);
            $unityPriceVariation->end = Carbon::parse($unityPriceVariation->end);
            $unityPriceVariation->moduleObj = ($unityPriceVariation->module()->first()) ? $unityPriceVariation->module()->first() : [];
        }
        return $unityPriceVariations;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request['unity'] = auth()->user()->unity[0]['unity'];
        $request['start'] = Carbon::parse($request->start);
        $request['end'] = Carbon::parse($request->end);
        $request['value'] = ($request['value']) ? str_replace(',', '.', $request->value) : null;

        $unityPriceVariation = UnityPriceVariation::create($request->all());
        $unityPriceVariation->hour = date('H:m', strtotime($unityPriceVariation->hour));
        return $unityPriceVariation;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return UnityPriceVariation::findOrFail($id);
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
        $request['start'] = Carbon::parse($request->start);
        $request['end'] = Carbon::parse($request->end);
        $request['value'] = ($request['value']) ? str_replace(',', '.', $request->value) : null;

        $unityPriceVariation = UnityPriceVariation::findOrFail($id);
        $unityPriceVariation->update($request->all());
        $unityPriceVariation->hour = date('H:m', strtotime($unityPriceVariation->hour));
        return $unityPriceVariation;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $unityPriceVariation = UnityPriceVariation::findOrFail($id);
        $unityPriceVariation->delete();
        return $unityPriceVariation;
    }
}
