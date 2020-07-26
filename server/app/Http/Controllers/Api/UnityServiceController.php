<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

use App\Models\UnityService;

class UnityServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return UnityService::all();
    }

    public function expectedTimeService($service, $size)
    {
        $service = UnityService::where([['service', $service], ['size', $size]])->first();
        return ($service) ? $service->time : 0;
    }

    public function loadPerUnity($id)
    {
        $unitServices = UnityService::where([['unity', $id], ['type', '<>', 'SUB_SHOWER']])->get();
        foreach ($unitServices as $service) {
            $service->services = ($service->services()->get()) ? $service->services()->get() : [];
            $service->countServices = Schedule::where([['unity', $id], ['service', $service->id]])->count();
        }
        return $unitServices;
    }

    public function loadSubService($id)
    {
        $unitServices = UnityService::where([['unity', $id], ['type', 'SUB_SHOWER']])->get();
        foreach ($unitServices as $service) {
            $service->services = ($service->services()->get()) ? $service->services()->get() : [];
        }
        return $unitServices;
    }

    public function loadShowers($id)
    {
        $unitService = UnityService::where([['unity', $id], ['type', 'SHOWER']])->first();
        $showers = ($unitService->services()->get()) ? $unitService->services()->get() : [];
        foreach ($showers as $shower) {
            $shower->size = ($shower->sizes()->first()) ? $shower->sizes()->first() : [];
            $shower->breed = ($shower->breeds()->first()) ? $shower->breeds()->first() : [];
            $shower->type_fur = ($shower->type_furs()->first()) ? $shower->type_furs()->first() : [];
        }
        return $showers;
    }

    public function loadSubShowers($id)
    {
        $unitServices = UnityService::where([['unity', $id], ['type', 'SUB_SHOWER']])->get();
        foreach ($unitServices as $unitService) {
            $subShowers[$unitService->id] = ($unitService->services()->get()) ? $unitService->services()->get() : [];
            foreach ($subShowers[$unitService->id] as $subShower) {
                $subShower->size = ($subShower->sizes()->first()) ? $subShower->sizes()->first() : [];
                $subShower->breed = ($subShower->breeds()->first()) ? $subShower->breeds()->first() : [];
                $subShower->type_fur = ($subShower->type_furs()->first()) ? $subShower->type_furs()->first() : [];
            }
        }
        return $subShowers;
    }

    public function loadTransports($id)
    {
        $unitService = UnityService::where([['unity', $id], ['type', 'TRANSPORT']])->first();
        $transports = ($unitService->services()->get()) ? $unitService->services()->get() : [];
        foreach ($transports as $transport) {
            $transport->region = ($transport->regions()->first()) ? $transport->regions()->first() : [];
            $transport->districts = ($transport->region->districts()->get()) ? $transport->region->districts()->get() : [];
        }
        return $transports;
    }

    public function loadPetSitters($id)
    {
        $unitService = UnityService::where([['unity', $id], ['type', 'PET_SITTER']])->first();
        $petSitters = ($unitService->services()->get()) ? $unitService->services()->get() : [];
        foreach ($petSitters as $petSitter) {
            $petSitter->user = ($petSitter->user()->first()) ? $petSitter->user()->first() : [];
            $petSitter->region = ($petSitter->regions()->first()) ? $petSitter->regions()->first() : [];
            $petSitter->districts = ($petSitter->region->districts()->get()) ? $petSitter->region->districts()->get() : [];
        }
        return $petSitters;
    }

    public function loadDayCares($id)
    {
        $unitService = UnityService::where([['unity', $id], ['type', 'DAY_CARE']])->first();
        $dayCares = ($unitService->services()->get()) ? $unitService->services()->get() : [];
        foreach ($dayCares as $dayCare) {
            $dayCare->size = ($dayCare->sizes()->first()) ? $dayCare->sizes()->first() : [];
        }
        return $dayCares;
    }

    public function loadHotels($id)
    {
        $unitService = UnityService::where([['unity', $id], ['type', 'HOTEL']])->first();
        $hotels = ($unitService->services()->get()) ? $unitService->services()->get() : [];
        foreach ($hotels as $hotel) {
            $hotel->size = ($hotel->sizes()->first()) ? $hotel->sizes()->first() : [];
        }
        return $hotels;
    }

    public function loadOthers($id)
    {
        $unitService = UnityService::where([['unity', $id], ['type', 'OTHER']])->first();
        $others = ($unitService->services()->get()) ? $unitService->services()->get() : [];
        return $others;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $serviceSubShower = UnityService::where([['id', $request->service], ['type', 'SUB_SHOWER']])->first();
        $request['unity'] = auth()->user()->unity[0]['unity'];
        $request['user'] = $request['user']['id'];
        $request['price'] = ($request['price']) ? str_replace(',', '.', $request->price) : null;
        $request['size'] = $request['size']['id'];
        $request['breed'] = $request['breed']['id'];
        $request['type_fur'] = $request['type_fur']['id'];
        $request['region'] = $request['region']['id'];

        $unitService = UnityService::create($request->all());

        $unitService->user = ($unitService->user()->first()) ? $unitService->user()->first() : [];
        $unitService->size = ($unitService->sizes()->first()) ? $unitService->sizes()->first() : [];
        $unitService->breed = ($unitService->breeds()->first()) ? $unitService->breeds()->first() : [];
        $unitService->type_fur = ($unitService->type_furs()->first()) ? $unitService->type_furs()->first() : [];
        $unitService->region = ($unitService->regions()->first()) ? $unitService->regions()->first() : [];
        $unitService->districts = ($unitService->region && $unitService->region->districts()->get()) ? $unitService->region->districts()->get() : [];

        if ($serviceSubShower) {
            return $this->loadSubShowers($request['unity']);
        }

        return $unitService;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return UnityService::findOrFail($id);
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
        $request['user'] = $request['user']['id'];
        $request['price'] = ($request['price']) ? str_replace(',', '.', $request->price) : null;
        $request['size'] = $request['size']['id'];
        $request['breed'] = $request['breed']['id'];
        $request['type_fur'] = $request['type_fur']['id'];
        $request['region'] = $request['region']['id'];

        $unitService = UnityService::findOrFail($id);
        $unitService->update($request->all());

        $unitService->user = ($unitService->user()->first()) ? $unitService->user()->first() : [];
        $unitService->size = ($unitService->size()->first()) ? $unitService->size()->first() : [];
        $unitService->breed = ($unitService->breed()->first()) ? $unitService->breed()->first() : [];
        $unitService->type_fur = ($unitService->type_fur()->first()) ? $unitService->type_fur()->first() : [];
        $unitService->region = ($unitService->regions()->first()) ? $unitService->regions()->first() : [];
        $unitService->districts = ($unitService->region && $unitService->region->districts()->get()) ? $unitService->region->districts()->get() : [];

        return $unitService;
    }

    public function updateStatus(Request $request)
    {
        $unitService = UnityService::findOrFail($request['payload']);
        UnityService::where('id', $unitService->id)->update(['status' => ($unitService->status == 1) ? 0 : 1]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $unitService = UnityService::findOrFail($id);
        $serviceSubShower = UnityService::where([['id', $unitService->service], ['type', 'SUB_SHOWER']])->first();
        $unitService->delete();

        if ($serviceSubShower) {
            return $this->loadSubShowers(auth()->user()->unity[0]['unity']);
        }

        return $unitService;
    }
}
