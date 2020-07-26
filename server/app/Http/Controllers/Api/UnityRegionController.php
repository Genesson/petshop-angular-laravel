<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\UnityRegion;
use App\Models\UnityDistrict;

class UnityRegionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $unityRegions = UnityRegion::where('unity', auth()->user()->unity[0]['unity'])->get();
            foreach ($unityRegions as $unityRegion) {
                $unityRegion->districtsArray = ($unityRegion->districts()->get()) ? $unityRegion->districts()->get() : [];
                $unityRegion->districtsName = '';
                $unityRegion->districts = '';
                foreach ($unityRegion->districtsArray as $district) {
                    $unityRegion->districtsName .= $district->description . ',';
                    $unityRegion->districts .= $district->id . ',';
                }
                $unityRegion->districtsName = (strlen($unityRegion->districtsName) > 0) ? substr($unityRegion->districtsName, 0, -1) : '';
                $unityRegion->districts = substr($unityRegion->districts, 0, -1);
                $unityRegion->districts = array_map('intval', explode(',', $unityRegion->districts));
            }
            return $unityRegions;
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
            $unityRegion = UnityRegion::create($request->all());

            if (isset($request->districts)) {
                foreach ($request->districts as $district) {
                    UnityDistrict::where(['id' => $district])->update(['region' => $unityRegion->id]);
                }
            }
            $unityRegion->districts = $request->districts;
            return $this->index();
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
        return UnityRegion::findOrFail($id);
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
        $unityRegion = UnityRegion::findOrFail($id);
        $unityRegion->update($request->all());

        UnityDistrict::where(['region' => $id])->update(['region' => null]);

        if (isset($request->districts)) {
            foreach ($request->districts as $district) {
                UnityDistrict::where(['id' => $district])->update(['region' => $unityRegion->id]);
            }
        }
        $unityRegion->districts = $request->districts;
        return $this->index();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $unityRegion = UnityRegion::findOrFail($id);
        $unityRegion->delete();
        return $unityRegion;
    }
}
