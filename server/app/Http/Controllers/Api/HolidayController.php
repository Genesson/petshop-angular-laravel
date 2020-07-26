<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UnityHoliday;
use Illuminate\Http\Request;

use App\Models\Holiday;

class HolidayController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
         return Holiday::where('type_code', 1)->whereYear('date', 2020)->get();
    }

    public function loadPerUnity()
    {
        $holidays = Holiday::where('type_code', 1)->whereYear('date', 2020)->get();
        foreach ($holidays as $holiday) {
            $holiday['exception'] = UnityHoliday::where([['unity', auth()->user()->unity[0]['unity']], ['holiday', $holiday->id]])->exists();
        }
        return $holidays;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $existHoliday = UnityHoliday::where([['unity', auth()->user()->unity[0]['unity']], ['holiday', $request->id]])->exists();
        if ($existHoliday) {
            UnityHoliday::where([['unity', auth()->user()->unity[0]['unity']], ['holiday', $request->id]])->delete();
        } else {
            $unityHoliday = ['unity' => auth()->user()->unity[0]['unity'], 'holiday' => $request->id];
            UnityHoliday::create($unityHoliday);
        }
        return $this->loadPerUnity();
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cr = curl_init();
        curl_setopt($cr, CURLOPT_HEADER, false);
        curl_setopt($cr, CURLOPT_URL, 'https://api.calendario.com.br/?json=true&ano=2021&token=Z2VuZXNzb25fc2F1ZXJAaG90bWFpbC5jb20maGFzaD0xMDY2NTEwNDA');
        curl_setopt($cr, CURLOPT_RETURNTRANSFER, true);
        $dados = json_decode(curl_exec($cr), true);
        curl_close($cr);

        foreach ($dados as $dado) {
            $dado['date'] = implode("-", array_reverse(explode("/", $dado['date'])));
            $dado['date'] = date('Y-m-d', strtotime($dado['date']));
            Holiday::create($dado);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
