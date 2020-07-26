<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UnityCategoryService;
use Illuminate\Http\Request;

use App\Models\UnityCategory;

class UnityCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UnityCategory::all();
    }

    public function loadPerUnity($id)
    {
        $unitCategories = UnityCategory::where('unity', $id)->get();
        foreach ($unitCategories as $unitCategory) {
            $unitCategory->service = ($unitCategory->services()->get()) ? $unitCategory->services()->get() : [];
            $unitCategory->services = '';
            foreach ($unitCategory->service as $service) {
                $unitCategory->services = $unitCategory->services . $service->service . ',';
            }
            $unitCategory->services = substr($unitCategory->services, 0, -1);
            $unitCategory->services = array_map('intval', explode(',', $unitCategory->services));
        }
        return $unitCategories;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $unityCategory = UnityCategory::create($request->all());
        /*foreach ($request->services as $service) {
            $userUnity = [
                'category' => $unityCategory->id,
                'service' => $service
            ];
            UnityCategoryService::create($userUnity);
        }
        $unityCategory->services = $request->services;*/
        return $unityCategory;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return UnityCategory::findOrFail($id);
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
        $unityCategory = UnityCategory::findOrFail($id);
        $unityCategory->update($request->all());
        /*UnityCategoryService::where('category', $unityCategory->id)->delete();
        foreach ($request->services as $service) {
            $userUnity = [
                'category' => $unityCategory->id,
                'service' => $service
            ];
            UnityCategoryService::create($userUnity);
        }
        $unityCategory->services = $request->services;*/
        return $unityCategory;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $unityCategory = UnityCategory::findOrFail($id);
        $unityCategory->delete();
        return $unityCategory;
    }
}
