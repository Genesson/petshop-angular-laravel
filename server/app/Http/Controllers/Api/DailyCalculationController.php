<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\UnityCheck;
use App\Models\UnityPriceVariation;
use App\Models\UnityService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class DailyCalculationController extends Controller
{
    private $request;
    private $days = 0;
    private $hightSessionAmount = 0;
    private $hightSessionDays;
    private $dailyAmount = 0;
    private $totalAmount = 0;
    private $daily;
    private $middle;
    private $checkIn;
    private $checkOut;
    private $pet_size;
    private $hightSession;

    public function __construct()
    {
    }

    public function index(Request $request)
    {
        $this->request = $request;
        if (!$this->checkData()) return response()->json([], 500);
        if (count($this->unitTimes()) !== 2) return response()->json(['erro' => true, 'message' => 'Configure o Check-in e Check-out desta unidade!'], 500);
        $this->checkIn = $this->unitTimes()['CHECK-IN'];
        $this->checkOut = $this->unitTimes()['CHECK-OUT'];
        $this->pet_size = $request->pet_size;
        $this->daily = $this->dailyValue();
        $this->middle = $this->middleValue();

        $this->hightSession = UnityPriceVariation::where([['unity', $request->unity_id], ['module', 'HOTEL']])
            ->whereBetween('end', array($request->checkin_date, $request->checkout_date))
            ->first();

        $this->hightSessionDays = $this->calculateDaysInterval($request->checkin_date, $request->checkout_date);

        $this->calcDays();
        $this->checkHours();
        $days = \collect($this->checkHightSession());
        $this->calculatePontualCheckin($days);

        if ($this->isServiceBySize()) {
            return response()->json(['erro' => true, 'message' => 'Serviço não encontrato para o porte do pet!'], 500);
        }

        if (!$this->dailyValue()) {
            return response()->json(['erro' => true, 'message' => 'Cadastre o período "meia e inteira" para o serviço de hotel desta unidade!'], 500);
        }

        if (!$this->middleValue()) {
            return response()->json(['erro' => true, 'message' => 'Cadastre o período "meia e inteira" para o serviço de hotel desta unidade!'], 500);
        }

        $this->dailyAmount = (int) $this->days * $this->dailyValue();
        if ($this->days - (int) $this->days) {
            $this->dailyAmount += $this->middleValue();
        }
        $this->totalAmount = $this->dailyAmount + $this->hightSessionAmount;

        return response()->json([
            "days" => $this->days,
            "daily_amount" => $this->dailyAmount,
            "hight_session_amount" => round($this->hightSessionAmount),
            "total_amount" => round($this->totalAmount)
        ]);
    }

    private function isServiceBySize()
    {
        $service = UnityService::where([['unity', $this->request->unity_id], ['type', 'HOTEL']])->first();
        $service = UnityService::where([['service', $service->id], ['size', $this->pet_size]])->first();
        if (!$service) {
            return false;
        }
    }

    private function dailyValue()
    {
        $service = UnityService::where([['unity', $this->request->unity_id], ['type', 'HOTEL']])->first();
        $service = UnityService::where([['service', $service->id], ['size', $this->pet_size], ['period', 'INTEIRA']])->first();
        if ($service) {
            return $service->price;
        } else {
            return false;
        }
    }

    private function middleValue()
    {
        $service = UnityService::where([['unity', $this->request->unity_id], ['type', 'HOTEL']])->first();
        $service = UnityService::where([['service', $service->id], ['size', $this->pet_size], ['period', 'MEIA']])->first();
        if ($service) {
            return $service->price;
        } else {
            return false;
        }
    }

    private function unitTimes()
    {
        $dataChecks = [];
        $weekMap = [
            0 => 'sunday',
            1 => 'monday',
            2 => 'tuesday',
            3 => 'wednesday',
            4 => 'thursday',
            5 => 'friday',
            6 => 'saturday',
        ];
        $dayOfTheWeek = Carbon::now()->dayOfWeek;
        $weekday = $weekMap[$dayOfTheWeek];
        $unityChecks = UnityCheck::where([['unity', $this->request->unity_id], [$weekday, 1]])->get();
        foreach ($unityChecks as $unityCheck) {
            $dataChecks[$unityCheck->type] = $unityCheck->hour;
        }
        return $dataChecks;
    }

    private function calcDays()
    {
        $checkIn = Carbon::parse($this->request->checkin_date);
        $checkOut = Carbon::parse($this->request->checkout_date);

        $this->days += $checkOut->diffInDays($checkIn);
    }

    private function checkHours()
    {
        if (strtotime($this->request->checkin_hour) < strtotime($this->checkIn)) {
            $this->days += 0.5;
        }

        if (strtotime($this->request->checkout_hour) > strtotime($this->checkOut)) {
            $this->days += 0.5;
        }
    }

    private function checkHightSession()
    {
        if (!$this->hightSession) return;
        $checkIn = $this->request->checkin_date;
        $checkOut = $this->request->checkout_date;
        $days = $this->calculateDaysInterval($checkIn, $checkOut);
        return $days;
    }

    private function calculateDaysInterval($start, $end)
    {
        $days = [];
        $start = Carbon::parse($start);
        $end = Carbon::parse($end);
        $current = $start;
        $run = true;

        while ($run) {
            if ($current->diffInDays($end) == 0) $run = false;
            $insert = $current;
            $insert = $insert->isoFormat("YYYY-MM-DD");
            $days[] = $insert;
            $current->addDays(1);
        }

        return $days;
    }

    private function calculatePontualCheckin($days)
    {
        foreach ($this->hightSessionDays as $day) {
            if ($days->contains($day)) {
                $value = isset($this->hightSession->value) ? $this->hightSession->value : ($this->hightSession->percent * $this->daily) / 100;
                $this->hightSessionAmount += $value;

                /**
                 * Se  chegou antes do horario
                 */
                if (($day == $this->request->checkin_date) && (strtotime($this->request->checkin_hour) < strtotime($this->checkIn))) {
                    $this->hightSessionAmount += ($value / 2);
                }

                /**
                 * Se saiu depois do horario
                 */
                if (($day == $this->request->checkout_date) && (strtotime($this->request->checkout_hour) > strtotime($this->checkOut))) {
                    $this->hightSessionAmount += ($value / 2);
                    $this->hightSessionAmount -= $value;
                } else if ($day == $this->request->checkout_date) {
                    /**
                     * Saiu dentro horario
                     */
                    $this->hightSessionAmount -= $value;
                }
            }
        }
    }

    private function checkData()
    {
        if (!$this->request) return false;
        if (!$this->request->checkin_date) return false;
        if (!$this->request->checkin_hour) return false;
        if (!$this->request->checkout_date) return false;
        if (!$this->request->checkout_hour) return false;
        return true;
    }
}
