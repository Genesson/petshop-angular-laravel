<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UnityExceptionDate;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UnityExceptionDateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $unityExceptionDates = UnityExceptionDate::where('unity', auth()->user()->unity[0]['unity'])->get();
            foreach ($unityExceptionDates as $unityExceptionDate) {
                $unityExceptionDate['date_start'] =  Carbon::parse($unityExceptionDate['date_start']);
                $unityExceptionDate['date_end'] =  Carbon::parse($unityExceptionDate['date_end']);
            }
            return $unityExceptionDates;
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
            $request['date_start'] = date('Y-m-d', strtotime($request->date[0]));
            $request['date_end'] = date('Y-m-d', strtotime($request->date[1]));
            $unityExceptionDate = UnityExceptionDate::create($request->all());
            return $unityExceptionDate;
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
        return UnityExceptionDate::findOrFail($id);
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
        $request['date_start'] = date('Y-m-d', strtotime($request->date[0]));
        $request['date_end'] = date('Y-m-d', strtotime($request->date[1]));
        $unityExceptionDate = UnityExceptionDate::findOrFail($id);
        $unityExceptionDate->update($request->all());
        return $unityExceptionDate;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $unityExceptionDate = UnityExceptionDate::findOrFail($id);
        $unityExceptionDate->delete();
        return $unityExceptionDate;
    }
}
