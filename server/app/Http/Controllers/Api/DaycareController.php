<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Daycare;
use App\Models\Schedule;
use App\Models\UnityService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DaycareController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $daycare = Daycare::where("status", true)->get();
        return $daycare;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($daycare = Daycare::create($request->all())) {
            return response()->json($daycare, 200);
        }
        return response()->json([], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Daycare $daycare
     * @return \Illuminate\Http\Response
     */
    public function show(Daycare $daycare)
    {
        return $daycare;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Daycare $daycare
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        switch ($request->action) {
            case 'PRESENCE':
                Daycare::where('schedule', $request->schedule)->update(['presence_date' => Carbon::now()]);
                break;
            case 'PEED':
                Daycare::where('schedule', $request->schedule)->update(['peed_date' => Carbon::now()]);
                break;
            case 'POOPED':
                Daycare::where('schedule', $request->schedule)->update(['pooped_date' => Carbon::now()]);
                break;
            case 'FIST_MEAT':
                Daycare::where('schedule', $request->schedule)->update(['first_meat_date' => Carbon::now()]);
                break;
            case 'SECOND_MEAT':
                Daycare::where('schedule', $request->schedule)->update(['second_meat_date' => Carbon::now()]);
                break;
            case 'OBSERVATION_MEAT':
                Daycare::where('schedule', $request->schedule)->update(['observation_date' => Carbon::now()]);
                break;
        }

        Daycare::where('schedule', $request->schedule)->update($request->all());
        return $this->showSchedule($request->schedule);
    }

    public function updateAll(Request $request)
    {
        foreach ($request->schedule as $schedule) {
            switch ($request->action) {
                case 'PRESENCE':
                    Daycare::where('schedule', $schedule['id'])->update(['presence' => 1, 'presence_date' => Carbon::now()]);
                    break;
                case 'PEED':
                    Daycare::where('schedule', $schedule['id'])->update(['peed' => 1, 'peed_date' => Carbon::now()]);
                    break;
                case 'POOPED':
                    Daycare::where('schedule', $schedule['id'])->update(['pooped' => 1, 'pooped_date' => Carbon::now()]);
                    break;
                case 'FIST_MEAT':
                    Daycare::where('schedule', $schedule['id'])->update(['first_meat' => 'COMEU_TUDO', 'first_meat_date' => Carbon::now()]);
                    break;
                case 'SECOND_MEAT':
                    Daycare::where('schedule', $schedule['id'])->update(['second_meat' => 'COMEU_TUDO', 'second_meat_date' => Carbon::now()]);
                    break;
                case 'OUT':
                    Daycare::where('schedule', $schedule['id'])->update(['out' => 1, 'out_date' => Carbon::now()]);
                    break;
            }
        }

        $unity = auth()->user()->unity[0]['unity'];
        $daycare = UnityService::where(['unity' => $unity, 'type' => 'DAY_CARE'])->first();
        $schedules = Schedule::where('service', $daycare->id)->get();
        foreach ($schedules as $schedule) {
            $schedule->pet = ($schedule->pet()->first()) ? $schedule->pet()->first() : [];
            $schedule->pet->user = ($schedule->pet->user()->first()) ? $schedule->pet->user()->first() : [];
            $schedule->daycare = ($schedule->daycare()->first()) ? $schedule->daycare()->first() : [];
            $schedule->check = true;
        }
        return $schedules;
    }

    public function showSchedule($id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->category = ($schedule->category()->first()) ? $schedule->category()->first() : [];
        $schedule->service = ($schedule->service()->first()) ? $schedule->service()->first() : [];
        $schedule->pet = ($schedule->pet()->first()) ? $schedule->pet()->first() : [];
        $schedule->user = ($schedule->user()->first()) ? $schedule->user()->first() : [];
        $schedule->daycare = ($schedule->daycare()->first()) ? $schedule->daycare()->first() : [];

        $timestamp = strtotime($schedule->hour) + ($schedule->time * 60);
        $hour = strftime('%H:%M:%S', $timestamp);

        $schedule->title = ($schedule->category) ? $schedule->category['description'] : $schedule->service['description'];
        $schedule->title .= ': ' . $schedule->pet['name'];

        if ($schedule->service) {
            if ($schedule->service['type'] === 'HOTEL') {
                $schedule->startTime = $schedule->date_checkin . ' ' . $schedule->hour_checkin;
                $schedule->endTime = $schedule->date_checkout . ' ' . $schedule->hour_checkout;
            } else {
                $schedule->startTime = $schedule->date . ' ' . $schedule->hour;
                $schedule->endTime = $schedule->date . ' ' . $hour;
            }
        } else {
            $schedule->startTime = $schedule->date_checkin . ' ' . $schedule->hour_checkin;
            $schedule->endTime = $schedule->date_checkin . ' ' . $schedule->hour_checkout;
        }

        $schedule->allDay = false;
        $schedule->desc = ($schedule->category) ? $schedule->category['description'] : $schedule->service['description'];
        $schedule->desc .= ': ' . $schedule->pet['name'];
        return $schedule;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Models\Daycare $daycare
     * @return \Illuminate\Http\Response
     */
    public function destroy(Daycare $daycare)
    {
        $daycare->status = false;
        if ($daycare->save()) {
            return response()->json($daycare, 200);
        }
        return response()->json([], 500);
    }
}
