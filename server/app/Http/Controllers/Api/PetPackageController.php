<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Package;
use App\Models\Pet;
use App\Models\PetPackage;
use App\Models\PetSize;
use App\Models\Schedule;
use App\Models\UnityService;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PetPackageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        $pet = Pet::where('id', $request->pet['id'])->first();
        $isOther = 0;

        if ($request->package) {
            $package = Package::where('id', $request->package['id'])->first();
            $service = UnityService::where([['unity', $request['unity']], ['service', $package->service], ['size', $request->pet['size']['id']]])->first();
        } else {
            $service = UnityService::where([['unity', $request['unity']], ['service', $request->service['id']], ['size', $request->pet['size']['id']]])->first();
        }

        $sizeAll = PetSize::where([['unity', $request['unity']], ['description', 'Todos']])->first();
        if (!$service && $sizeAll) {
            $serviceAll = UnityService::where([['unity', $request['unity']], ['service', $request->service['id']], ['size', $sizeAll->id]])->first();
            $service = ($service) ? $service : $serviceAll;
        }

        $serviceOther = UnityService::select('service')->where('id', $request->service)->first();
        $isOther = UnityService::select('type')->where('id', $serviceOther->service)->first();
        if ($isOther && $isOther->type == 'OTHER') {
            $service = UnityService::where('id', $request->service)->first();
            $isOther = 1;
        }
        if ($service) {
            $service->total = ($request->package) ? $request->package['price'] : $service->price * (count($request->intervals) + 1);

            $dataPackage = [
                'pet' => $request->pet['id'],
                'service' => $service->id,
                'quantity_days' => $request->quantity_days,
                'interval_days' => null,
                'weekdays' => ($request->weekdays) ? 1 : 0,
                'with_month' => ($request->with_month) ? 1 : 0,
                'start_date' => ($request->start_date) ? date('Y-m-d', strtotime(Carbon::parse($request->start_date))) : null,
                'week_days' => ($request->week_days) ? $request->week_days : null,
                'intervals' => null,
                'transport' => $request['transport'],
                'transport_id' => $request['transport_id'],
                'status' => true
            ];
            $petPackage = PetPackage::create($dataPackage);

            $data = [
                'unity' => $request['unity'],
                'user' => $request->user['id'],
                'pet' => $request->pet['id'],
                'service' => ($isOther == 1) ? $service->id : $service->service,
                'package' => $petPackage->id,
                'date' => date('Y-m-d', strtotime($request->start_date)),
                'hour' => date('H:i:s', strtotime($request->hour)),
                'time' => $request->time,
                'status' => true
            ];
            Schedule::create($data);
            foreach ($request->intervals as $interval) {
                $data = [
                    'unity' => $request['unity'],
                    'user' => $request->user['id'],
                    'pet' => $request->pet['id'],
                    'service' => ($isOther == 1) ? $service->id : $service->service,
                    'package' => $petPackage->id,
                    'date' => date('Y-m-d', strtotime($interval)),
                    'hour' => date('H:i:s', strtotime($request->hour)),
                    'time' => $request->time,
                    'status' => true
                ];
                Schedule::create($data);
            }
            // RETURN
            $petPackage['id'] = $petPackage->id;
            $petPackage['pet'] = $pet;
            $petPackage['service'] = $service;
            $petPackage['quantity'] = count($request->intervals) + 1;
            return $petPackage;
        }
        return response()->json(['erro' => true, 'message' => 'Serviço não encontrato para o porte do pet!'], 500);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
