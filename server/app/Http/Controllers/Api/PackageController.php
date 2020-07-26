<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PackageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $packages = Package::where([
                ['unity', auth()->user()->unity[0]['unity']],
                ['status', true]
            ])->get();
            foreach ($packages as $package) {
                $package->service_type = unserialize($package->service_type);
            }
            return $packages;
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
            $request['unity'] = auth()->user()->unity[0]['unity'];
            $request['price'] = ($request['price']) ? str_replace(',', '.', $request->price) : null;
            $request['promotional_price'] = ($request['promotional_price']) ? str_replace(',', '.', $request->promotional_price) : null;
            $request['package_until'] = Carbon::parse($request['package_until']);
            if ($package = Package::create($request->all())) {
                return response()->json($package, 200);
            }
            return response()->json([], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $package = Package::find($id);
        $package->service_type = unserialize($package->service_type);
        return $package;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Package $package)
    {
        $request['price'] = ($request['price']) ? str_replace(',', '.', $request->price) : null;
        $request['promotional_price'] = ($request['promotional_price']) ? str_replace(',', '.', $request->promotional_price) : null;
        $request['package_until'] = Carbon::parse($request['package_until']);
        if ($package->update($request->all())) {
            return response()->json($package, 200);
        }
        return response()->json([], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Package  $package
     * @return \Illuminate\Http\Response
     */
    public function destroy(Package $package)
    {
        $package->status = false;
        if ($package->save()) {
            return response()->json($package, 200);
        }
        return response()->json([], 500);
    }

    public function getServiceTypes()
    {
        return Package::SERVICE_TYPES;
    }
}
