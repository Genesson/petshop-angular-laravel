<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Holiday;
use Cache;

class DateIntervalController extends Controller
{
    private $holidays;
    private $days;
    private $currentDate;

    public function __construct()
    {
        $time = 1440;
        $this->holidays = Cache::remember("holidays_" . Date("YYYY"), $time, function () {
            $holidays = Holiday::where('type_code', 1)->whereYear('date', Date("YYYY"))->get();
            return $holidays;
        });

        $this->days = \collect([]);
    }


    public function index(Request $request)
    {
        switch ($request->interval) {
            case 'days':
                return $this->calcWithDays($request);
                break;
            case 'weeks':
                return $this->calcWithWeeks($request);
                break;
        }
    }

    private function calcWithDays(Request $request)
    {
        $amount = $this->calcAmount($request);
        $interval = $request->days_interval;
        $startDate = $request->start_date;
        $startDate = $startDate ? Carbon::parse($startDate) : Carbon::now();

        for ($i = 0; $i < $amount; $i++) {
            $this->currentDate = $startDate->addDays($interval);
            $this->days[] = $this->addDate();
        }

        return $this->checkReturnDays($request);
    }

    private function calcWithWeeks(Request $request)
    {
        $amount = $this->calcAmount($request);
        $startDate = $request->start_date;
        $startDate = $startDate ? Carbon::parse($startDate) : Carbon::now();
        $this->currentDate = $startDate;
        $weekDays = \collect($request->week_days);

        while (sizeof($this->days) < $amount) {
            $this->currentDate = $this->currentDate->addDay();
            $currentWeekDay = $this->currentDate->isoFormat("ddd");

            if ($weekDays->contains($currentWeekDay)) {
                $this->days[] = $this->addDate();
            }
        }

        return $this->checkReturnDays($request);
    }

    private function calcAmount(Request $request)
    {
        if (!$request->closed_mouth) return $request->amount;

        switch ($request->interval) {
            case 'days':
                return $this->calcAmountWithDays($request);
                break;
            case 'weeks':
                return $this->calcAmountWithWeeks($request);
                break;
        }
    }

    private function calcAmountWithDays(Request $request)
    {
        $amount = 0;
        $interval = $request->days_interval;
        $date = $request->start_date;
        $date = $date ? Carbon::parse($date) : Carbon::now();

        $currentDate = $date->isoFormat("YYYY-MM-DD");
        $currentTimeDate = strtotime($currentDate);

        $lastMounthDay = $this->getLastMonthDay($date);

        while ($currentTimeDate <= $lastMounthDay) {
            $date = $date->addDays($interval);
            $currentDate = $date->isoFormat("YYYY-MM-DD");
            $currentTimeDate = strtotime($currentDate);

            if ($currentTimeDate <= $lastMounthDay) $amount++;
        }

        return $amount;
    }
    private function calcAmountWithWeeks(Request $request)
    {

        $amount = 0;
        $weekDays = \collect($request->week_days);
        $date = $request->start_date;
        $date = $date ? Carbon::parse($date) : Carbon::now();

        $currentDate = $date->isoFormat("YYYY-MM-DD");
        $currentTimeDate = strtotime($currentDate);

        $lastMounthDay = $this->getLastMonthDay($date);

        while ($currentTimeDate <= $lastMounthDay) {
            $date = $date->addDay();
            $currentDate = $date->isoFormat("YYYY-MM-DD");
            $currentWeekDay = $date->isoFormat("ddd");
            $currentTimeDate = strtotime($currentDate);

            if ($currentTimeDate <= $lastMounthDay && $weekDays->contains($currentWeekDay)) $amount++;
        }

        return $amount;
    }


    private function getLastMonthDay($date)
    {
        $lastMounthDay = Carbon::parse($date->isoFormat("YYYY-MM-DD"));
        $lastMounthDay = $lastMounthDay->endOfMonth()->isoFormat("YYYY-MM-DD");
        return strtotime($lastMounthDay);
    }

    private function addDate()
    {
        $date = Carbon::parse($this->currentDate->isoFormat("YYYY-MM-DD"));
        while (!$this->checkEndOfWeek($date)) {
            $this->date = $date->addDay();
        }
        return $date->isoFormat("YYYY-MM-DD");
    }

    private function checkEndOfWeek($date)
    {
        $unWorkWeekDays = \collect(["Sat", "Sun"]);
        $contaisUnWork = $unWorkWeekDays->contains($date->isoFormat("ddd"));
        $contaisInDays = $this->days->contains($date->isoFormat("YYYY-MM-DD"));
        return !$contaisUnWork && !$contaisInDays;
    }

    private function checkReturnDays(Request $request)
    {
        if (!$request->closed_mouth) return $this->days;

        $date = $request->start_date;
        $date = $date ? Carbon::parse($date) : Carbon::now();
        $lastMounthDay = $this->getLastMonthDay($date);

        foreach ($this->days as $key => $day) {
            $currentTimeDate = strtotime($day);
            if ($currentTimeDate > $lastMounthDay) unset($this->days[$key]);
        }

        return $this->days;
    }
}
