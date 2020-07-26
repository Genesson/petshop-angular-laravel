<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Daycare;
use App\Models\Pet;
use App\Models\PetSize;
use App\Models\UnityService;
use Illuminate\Http\Request;

use App\Models\Schedule;

use Carbon\Carbon;
use DateTime;
use DateTimeZone;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $schedules = Schedule::where('unity', auth()->user()->unity[0]['unity'])->get();
            foreach ($schedules as $schedule) {
                $schedule->pet = ($schedule->pet()->first()) ? $schedule->pet()->first() : false;
                if (!$schedule->pet) {
                    Schedule::where('id', $schedule->id)->delete();
                }
            }
            $schedules = Schedule::where('unity', auth()->user()->unity[0]['unity'])->get();
            foreach ($schedules as $schedule) {
                $schedule->category = ($schedule->category()->first()) ? $schedule->category()->first() : [];
                $schedule->service = ($schedule->service()->first()) ? $schedule->service()->first() : [];
                $schedule->pet = ($schedule->pet()->first()) ? $schedule->pet()->first() : [];
                $schedule->user = ($schedule->user()->first()) ? $schedule->user()->first() : [];
                $schedule->daycare = ($schedule->daycare()->first()) ? $schedule->daycare()->first() : [];
                $schedule->order = ($schedule->order()->first()) ? $schedule->order()->first() : [];
                $schedule->check = false;

                $timeZone = new DateTimeZone('America/Sao_Paulo');

                $schedule->hour = new DateTime($schedule->hour);
                $schedule->hour->setTimezone($timeZone);
                $schedule->hour = $schedule->hour->format('H:i:s');

                $timestamp = strtotime($schedule->hour) + ($schedule->time * 60);
                $hour = strftime('%H:%M:%S', $timestamp);

                $schedule->hour_checkin = new DateTime($schedule->hour_checkin);
                $schedule->hour_checkin->setTimezone($timeZone);
                $schedule->hour_checkin = $schedule->hour_checkin->format('H:i:s');

                $schedule->hour_checkout = new DateTime($schedule->hour_checkout);
                $schedule->hour_checkout->setTimezone($timeZone);
                $schedule->hour_checkout = $schedule->hour_checkout->format('H:i:s');

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
            }
            return $schedules;
        }
    }

    public function service($id)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $schedules = Schedule::where([
                ['service', $id],
                ['unity', auth()->user()->unity[0]['unity']]
            ])->get();
            foreach ($schedules as $schedule) {
                $schedule->pet = ($schedule->pet()->first()) ? $schedule->pet()->first() : false;
                if (!$schedule->pet) {
                    Schedule::where('id', $schedule->id)->delete();
                }
            }
            $schedules = Schedule::where([
                ['service', $id],
                ['unity', auth()->user()->unity[0]['unity']]
            ])->get();
            foreach ($schedules as $schedule) {
                $schedule->category = ($schedule->category()->first()) ? $schedule->category()->first() : [];
                $schedule->service = ($schedule->service()->first()) ? $schedule->service()->first() : [];
                $schedule->pet = ($schedule->pet()->first()) ? $schedule->pet()->first() : [];
                $schedule->user = ($schedule->user()->first()) ? $schedule->user()->first() : [];
                $schedule->daycare = ($schedule->daycare()->first()) ? $schedule->daycare()->first() : [];
                $schedule->order = ($schedule->order()->first()) ? $schedule->order()->first() : [];
                $schedule->check = false;

                $timeZone = new DateTimeZone('America/Sao_Paulo');

                $schedule->hour = new DateTime($schedule->hour);
                $schedule->hour->setTimezone($timeZone);
                $schedule->hour = $schedule->hour->format('H:i:s');

                $timestamp = strtotime($schedule->hour) + ($schedule->time * 60);
                $hour = strftime('%H:%M:%S', $timestamp);

                $schedule->hour_checkin = new DateTime($schedule->hour_checkin);
                $schedule->hour_checkin->setTimezone($timeZone);
                $schedule->hour_checkin = $schedule->hour_checkin->format('H:i:s');

                $schedule->hour_checkout = new DateTime($schedule->hour_checkout);
                $schedule->hour_checkout->setTimezone($timeZone);
                $schedule->hour_checkout = $schedule->hour_checkout->format('H:i:s');

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
            }
            return $schedules;
        }
    }

    public function daycare($id)
    {
        if (auth()->user()) {
            $unity = auth()->user()->unity[0]['unity'];
            $daycare = UnityService::where(['unity' => $unity, 'type' => 'DAY_CARE'])->first();
            $schedules = Schedule::where('service', $daycare->id)->get();
            foreach ($schedules as $schedule) {
                $schedule->pet = ($schedule->pet()->first()) ? $schedule->pet()->first() : [];
                $schedule->pet->user = ($schedule->pet->user()->first()) ? $schedule->pet->user()->first() : [];
                $schedule->daycare = ($schedule->daycare()->first()) ? $schedule->daycare()->first() : [];
                $schedule->check = false;
            }
            return $schedules;
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Responses
     */
    public function store(Request $request)
    {
        if (auth()->user()) {
            $request['unity'] = isset($request->unity) ? $request->unity : auth()->user()->unity[0]['unity'];
            $pet = isset($request->pet['id']) ? Pet::where('id', $request->pet['id'])->first() : Pet::where('id', $request->pet)->first();
            if (!$pet) {
                return response()->json(['erro' => true, 'message' => 'Pet não existe!'], 500);
            }

            $service = UnityService::where([['unity', $request['unity']], ['service', $request->service], ['size', $pet->size]])->first();
            $sizeAll = PetSize::where([['unity', $request['unity']], ['description', 'Todos']])->first();
            if (!$service && $sizeAll) {
                $serviceAll = UnityService::where([['unity', $request['unity']], ['service', $request->service], ['size', $sizeAll->id]])->first();
                $service = ($service) ? $service : $serviceAll;
            }

            $isPetSitter = UnityService::select('type')->where('id', $request->service)->first();
            if ($isPetSitter && $isPetSitter->type == 'PET_SITTER') {
                $service = UnityService::where('service', $request->service)->first();
            }

            $serviceOther = UnityService::select('service')->where('id', $request->service)->first();
            $isOther = UnityService::select('type')->where('id', $serviceOther->service)->first();
            if ($isOther && $isOther->type == 'OTHER') {
                $service = UnityService::where('id', $request->service)->first();
            }

            $isHotel = UnityService::select('id', 'type')->where('id', $request->service)->first();
            if ($isHotel && $isHotel->type == 'HOTEL') {
                $service = UnityService::where([['service', $isHotel->id], ['size', $pet->size]])->first();
            }

            if ($service) {
                $service->total = ($request->total) ? $request->total : 0;

                if ($this->checkEmployeeSchedule($request)) {
                    return response()->json(['erro' => true, 'message' => 'Funcionário já tem um serviço neste horário!'], 500);
                }

                if ($request['period']) {
                    $servicePeriod = UnityService::where([
                        ['unity', $request['unity']],
                        ['service', $request->service],
                        ['size', $request->pet['size']['id']],
                        ['period', $request['period']]
                    ])->first();
                    if ($servicePeriod) {
                        $service = $servicePeriod;
                    } else {
                        return response()->json(['erro' => true, 'message' => 'Serviço não encontrato para este período!'], 500);
                    }
                }

                if ($request['date_checkin']) {
                    $request['date_checkin'] = ($request->date_checkin) ? date('Y-m-d', strtotime(Carbon::parse($request->date_checkin))) : null;
                    $request['hour_checkin'] = ($request->hour_checkin) ? date('H:i:s', strtotime(Carbon::parse($request->hour_checkin))) : null;
                    $request['date_checkout'] = ($request->date_checkout) ? date('Y-m-d', strtotime(Carbon::parse($request->date_checkout))) : null;
                    $request['hour_checkout'] = ($request->hour_checkout) ? date('H:i:s', strtotime(Carbon::parse($request->hour_checkout))) : null;

                    $service_check = Schedule::where([
                        ['date_checkin', '=', Carbon::parse($request['date_checkin'])->format('Y-m-d')],
                        ['hour_checkin', 'LIKE', Carbon::parse($request['hour_checkin'])->format('H') . '%'],
                        ['pet', '=', $pet->id]
                    ])->exists();
                    if ($service_check) {
                        return response()->json(['erro' => true, 'message' => 'Hóspede já tem uma reserva neste horário!'], 500);
                    }

                    $request['room'] = ($request['room']) ? $request->room['id'] : null;
                    $request['pet'] = $pet->id;

                    if ($request['room'] != null) {
                        $resort_check = Schedule::where([
                            ['date_checkin', '=', Carbon::parse($request['date_checkin'])->format('Y-m-d')],
                            ['room', '=', $request['room']],
                            ['pet', '=', $pet->id]
                        ])->exists();
                        if ($resort_check) {
                            return response()->json(['erro' => true, 'message' => 'Hóspede já está com a reserva para este quarto neste dia!'], 500);
                        } else {
                            $schedule = Schedule::create($request->all());

                            // RETURN
                            $schedule['pet'] = $pet;
                            $schedule['service'] = $service;
                            $this->createDaycare($pet->id, $schedule->id);
                            return $schedule;
                        }
                    } else {
                        $schedule = Schedule::create($request->all());

                        // RETURN
                        $schedule['pet'] = $pet;
                        $schedule['service'] = $service;
                        $this->createDaycare($pet->id, $schedule->id);
                        return $schedule;
                    }
                }

                $request['date'] = ($request->date) ? date('Y-m-d', strtotime(Carbon::parse($request->date))) : null;
                $request['hour'] = ($request->hour) ? date('H:i:s', strtotime(Carbon::parse($request->hour))) : null;

                $service_check = Schedule::where([
                    ['date', '=', Carbon::parse($request['date'])->format('Y-m-d')],
                    ['hour', 'LIKE', Carbon::parse($request['hour'])->format('H') . '%'],
                    ['pet', '=', $request['pet']]
                ])->exists();
                if ($service_check) {
                    return response()->json(['erro' => true, 'message' => 'Pet já está com a agendamento neste horário!'], 500);
                }

                $request['pet'] = $request->pet['id'];
                $request['service'] = $request->service;
                $request['user'] = $request->user['id'];

                $schedule = Schedule::create($request->all());

                // RETURN
                $schedule['pet'] = $pet;
                $schedule['service'] = $service;
                $this->createDaycare($pet->id, $schedule->id);
                return $schedule;
            }
            return response()->json(['erro' => true, 'message' => 'Serviço não encontrato para o porte do pet!'], 500);
        }
    }

    public function checkEmployeeSchedule($request)
    {
        if ($request->user['id']) {
            if ($request['date_checkin']) {
                $schedule = Schedule::where([
                    ['date_checkin', '=', Carbon::parse($request['date_checkin'])->format('Y-m-d')],
                    ['hour_checkin', 'LIKE', Carbon::parse($request['hour_checkin'])->format('H') . '%'],
                    ['user', '=', $request->user['id']]
                ])->exists();
                return ($schedule) ? true : false;
            }
            $schedule = Schedule::where([
                ['date', '=', Carbon::parse($request['date'])->format('Y-m-d')],
                ['hour', 'LIKE', Carbon::parse($request['hour'])->format('H') . '%'],
                ['user', '=', $request->user['id']]
            ])->exists();
            return ($schedule) ? true : false;
        }
        return false;
    }

    public function storeApp(Request $request)
    {
        $pet = Pet::where('id', $request->pet)->first();
        if (!$pet) {
            return response()->json(['erro' => true, 'message' => 'Pet não existe!'], 500);
        }

        $service = UnityService::where([
            ['unity', $request['unity']],
            ['service', $request->service],
            ['size', $pet->size]
        ])->first();
        $sizeAll = PetSize::where([['unity', $request['unity']], ['description', 'Todos']])->first();
        if (!$service && $sizeAll) {
            $serviceAll = UnityService::where([['unity', $request['unity']], ['service', $request->service], ['size', $sizeAll->id]])->first();
            $service = ($service) ? $service : $serviceAll;
        }

        if ($service) {
            $request['date'] = ($request->date) ? date('Y-m-d', strtotime(Carbon::parse($request->date))) : null;
            $request['hour'] = ($request->hour) ? date('H:i:s', strtotime(Carbon::parse($request->hour))) : null;

            $dataSchedule = [
                'unity' => $request['unity'],
                'user' => 0,
                'pet' => $pet->id,
                'service' => $service->id,
                'date' => $request['date'],
                'hour' => $request['hour'],
                'time' => $service->time,
                'status' => false
            ];
            $schedule = Schedule::create($dataSchedule);
            if ($schedule) {
                return response()->json(['erro' => false, 'message' => 'Agendamento solicitado com sucesso, aguarde sua confimação!'], 200);
            }
        } else {
            return response()->json(['erro' => true, 'message' => 'Serviço não encontrato para o porte do pet!'], 500);
        }
    }

    public function createDaycare($pet, $schedule)
    {
        $dataDaycare = ['pet' => $pet, 'schedule' => $schedule];
        Daycare::create($dataDaycare);
    }

    public function finished($id)
    {
        $schedule = Schedule::where('id', $id)->first();
        if (!$schedule->finished_at) {
            Schedule::where('id', $id)->update(['finished_at' => date('Y-m-d H:i:s')]);
        } else {
            Schedule::where('id', $id)->update(['finished_at' => null]);
        }
        return $this->show($id);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
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
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request['date'] = ($request->date) ? date('Y-m-d', strtotime(Carbon::parse($request->date))) : null;
        $request['hour'] = ($request->hour) ? date('H:i:s', strtotime(Carbon::parse($request->hour))) : null;

        $request['pet'] = $request->pet['id'];
        $request['service'] = $request->service['id'];
        $request['user'] = $request->user['id'];

        $schedule = Schedule::findOrFail($id);
        $schedule->update($request->all());
        return $schedule;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $schedule = Schedule::findOrFail($id);
        $schedule->delete();
        return $schedule;
    }
}
