<?php

namespace App\Http\Controllers\Api;

use App\Models\Permission;
use App\Models\PetBehavior;
use App\Models\PetBreed;
use App\Models\PetSize;
use App\Models\PetType;
use App\Models\PetTypeFur;
use App\Models\UnityCashier;
use App\Models\User;
use App\Models\UserUnity;
use Carbon\Carbon;
use Exception;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Unity;
use App\Models\UnityCategory;
use App\Models\UnityService;

class UnityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (auth()->user()) {
            $user = User::where('id', auth()->user()->id)->first();

            if ($user->role == 'CLIENT') {
                return $this->indexApp();
            }

            $unities = $user->unities()->get();

            $unitiesArray = [];
            foreach ($unities as $unity) {
                array_push($unitiesArray, $unity->unity()->first());
            }

            foreach ($unitiesArray as $unity) {
                $unity->cityObject = ($unity->city()->first()) ? $unity->city()->first() : [];
                $unity->provinceObject = ($unity->cityObject->province()->first()) ? $unity->cityObject->province()->first() : [];
                $unity->categories = ($unity->categories()->get()) ? $unity->categories()->get() : [];
                $unity->services = ($unity->services()->get()) ? $unity->services()->get() : [];
                $unity->hour_sunday_in = Carbon::parse($unity->hour_sunday_in);
                $unity->hour_sunday_interval_in = Carbon::parse($unity->hour_sunday_interval_in);
                $unity->hour_sunday_interval_out = Carbon::parse($unity->hour_sunday_interval_out);
                $unity->hour_sunday_out = Carbon::parse($unity->hour_sunday_out);
                $unity->hour_monday_in = Carbon::parse($unity->hour_monday_in);
                $unity->hour_monday_interval_in = Carbon::parse($unity->hour_monday_interval_in);
                $unity->hour_monday_interval_out = Carbon::parse($unity->hour_monday_interval_out);
                $unity->hour_monday_out = Carbon::parse($unity->hour_monday_out);
                $unity->hour_tuesday_in = Carbon::parse($unity->hour_tuesday_in);
                $unity->hour_tuesday_interval_in = Carbon::parse($unity->hour_tuesday_interval_in);
                $unity->hour_tuesday_interval_out = Carbon::parse($unity->hour_tuesday_interval_out);
                $unity->hour_tuesday_out = Carbon::parse($unity->hour_tuesday_out);
                $unity->hour_wednesday_in = Carbon::parse($unity->hour_wednesday_in);
                $unity->hour_wednesday_interval_in = Carbon::parse($unity->hour_wednesday_interval_in);
                $unity->hour_wednesday_interval_out = Carbon::parse($unity->hour_wednesday_interval_out);
                $unity->hour_wednesday_out = Carbon::parse($unity->hour_wednesday_out);
                $unity->hour_thursday_in = Carbon::parse($unity->hour_thursday_in);
                $unity->hour_thursday_interval_in = Carbon::parse($unity->hour_thursday_interval_in);
                $unity->hour_thursday_interval_out = Carbon::parse($unity->hour_thursday_interval_out);
                $unity->hour_thursday_out = Carbon::parse($unity->hour_thursday_out);
                $unity->hour_friday_in = Carbon::parse($unity->hour_friday_in);
                $unity->hour_friday_interval_in = Carbon::parse($unity->hour_friday_interval_in);
                $unity->hour_friday_interval_out = Carbon::parse($unity->hour_friday_interval_out);
                $unity->hour_friday_out = Carbon::parse($unity->hour_friday_out);
                $unity->hour_saturday_in = Carbon::parse($unity->hour_saturday_in);
                $unity->hour_saturday_interval_in = Carbon::parse($unity->hour_saturday_interval_in);
                $unity->hour_saturday_interval_out = Carbon::parse($unity->hour_saturday_interval_out);
                $unity->hour_saturday_out = Carbon::parse($unity->hour_saturday_out);
            }
            return $unitiesArray;
        }
    }

    public function indexApp()
    {
        $unities = Unity::all();

        foreach ($unities as $unity) {
            $unity->cityObject = ($unity->city()->first()) ? $unity->city()->first() : [];
            $unity->provinceObject = ($unity->cityObject->province()->first()) ? $unity->cityObject->province()->first() : [];
            $unity->categories = ($unity->categories()->get()) ? $unity->categories()->get() : [];
            $unity->services = ($unity->services()->get()) ? $unity->services()->get() : [];
            $unity->hour_sunday_in = Carbon::parse($unity->hour_sunday_in);
            $unity->hour_sunday_interval_in = Carbon::parse($unity->hour_sunday_interval_in);
            $unity->hour_sunday_interval_out = Carbon::parse($unity->hour_sunday_interval_out);
            $unity->hour_sunday_out = Carbon::parse($unity->hour_sunday_out);
            $unity->hour_monday_in = Carbon::parse($unity->hour_monday_in);
            $unity->hour_monday_interval_in = Carbon::parse($unity->hour_monday_interval_in);
            $unity->hour_monday_interval_out = Carbon::parse($unity->hour_monday_interval_out);
            $unity->hour_monday_out = Carbon::parse($unity->hour_monday_out);
            $unity->hour_tuesday_in = Carbon::parse($unity->hour_tuesday_in);
            $unity->hour_tuesday_interval_in = Carbon::parse($unity->hour_tuesday_interval_in);
            $unity->hour_tuesday_interval_out = Carbon::parse($unity->hour_tuesday_interval_out);
            $unity->hour_tuesday_out = Carbon::parse($unity->hour_tuesday_out);
            $unity->hour_wednesday_in = Carbon::parse($unity->hour_wednesday_in);
            $unity->hour_wednesday_interval_in = Carbon::parse($unity->hour_wednesday_interval_in);
            $unity->hour_wednesday_interval_out = Carbon::parse($unity->hour_wednesday_interval_out);
            $unity->hour_wednesday_out = Carbon::parse($unity->hour_wednesday_out);
            $unity->hour_thursday_in = Carbon::parse($unity->hour_thursday_in);
            $unity->hour_thursday_interval_in = Carbon::parse($unity->hour_thursday_interval_in);
            $unity->hour_thursday_interval_out = Carbon::parse($unity->hour_thursday_interval_out);
            $unity->hour_thursday_out = Carbon::parse($unity->hour_thursday_out);
            $unity->hour_friday_in = Carbon::parse($unity->hour_friday_in);
            $unity->hour_friday_interval_in = Carbon::parse($unity->hour_friday_interval_in);
            $unity->hour_friday_interval_out = Carbon::parse($unity->hour_friday_interval_out);
            $unity->hour_friday_out = Carbon::parse($unity->hour_friday_out);
            $unity->hour_saturday_in = Carbon::parse($unity->hour_saturday_in);
            $unity->hour_saturday_interval_in = Carbon::parse($unity->hour_saturday_interval_in);
            $unity->hour_saturday_interval_out = Carbon::parse($unity->hour_saturday_interval_out);
            $unity->hour_saturday_out = Carbon::parse($unity->hour_saturday_out);
        }
        return $unities;
    }

    public function restDays($unity)
    {
        $unit = Unity::where('id', $unity)->first();
        $days = '';
        $days .= (!$unit['sunday']) ? 'Sun, ' : '';
        $days .= (!$unit['monday']) ? 'Mon, ' : '';
        $days .= (!$unit['tuesday']) ? 'Tue, ' : '';
        $days .= (!$unit['wednesday']) ? 'Wed, ' : '';
        $days .= (!$unit['thursday']) ? 'Thu, ' : '';
        $days .= (!$unit['friday']) ? 'Fri, ' : '';
        $days .= (!$unit['saturday']) ? 'Sat, ' : '';
        return substr(trim($days), 0, -1);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (auth()->user()) {
            try {
                $request['hour_sunday_in'] = date('H:i:s', strtotime($request->hour_sunday_in));
                $request['hour_sunday_interval_in'] = date('H:i:s', strtotime($request->hour_sunday_interval_in));
                $request['hour_sunday_interval_out'] = date('H:i:s', strtotime($request->hour_sunday_interval_out));
                $request['hour_sunday_out'] = date('H:i:s', strtotime($request->hour_sunday_out));
                $request['hour_monday_in'] = date('H:i:s', strtotime($request->hour_monday_in));
                $request['hour_monday_interval_in'] = date('H:i:s', strtotime($request->hour_monday_interval_in));
                $request['hour_monday_interval_out'] = date('H:i:s', strtotime($request->hour_monday_interval_out));
                $request['hour_monday_out'] = date('H:i:s', strtotime($request->hour_monday_out));
                $request['hour_tuesday_in'] = date('H:i:s', strtotime($request->hour_tuesday_in));
                $request['hour_tuesday_interval_in'] = date('H:i:s', strtotime($request->hour_tuesday_interval_in));
                $request['hour_tuesday_interval_out'] = date('H:i:s', strtotime($request->hour_tuesday_interval_out));
                $request['hour_tuesday_out'] = date('H:i:s', strtotime($request->hour_tuesday_out));
                $request['hour_wednesday_in'] = date('H:i:s', strtotime($request->hour_wednesday_in));
                $request['hour_wednesday_interval_in'] = date('H:i:s', strtotime($request->hour_wednesday_interval_in));
                $request['hour_wednesday_interval_out'] = date('H:i:s', strtotime($request->hour_wednesday_interval_out));
                $request['hour_wednesday_out'] = date('H:i:s', strtotime($request->hour_wednesday_out));
                $request['hour_thursday_in'] = date('H:i:s', strtotime($request->hour_thursday_in));
                $request['hour_thursday_interval_in'] = date('H:i:s', strtotime($request->hour_thursday_interval_in));
                $request['hour_thursday_interval_out'] = date('H:i:s', strtotime($request->hour_thursday_interval_out));
                $request['hour_thursday_out'] = date('H:i:s', strtotime($request->hour_thursday_out));
                $request['hour_friday_in'] = date('H:i:s', strtotime($request->hour_friday_in));
                $request['hour_friday_interval_in'] = date('H:i:s', strtotime($request->hour_friday_interval_in));
                $request['hour_friday_interval_out'] = date('H:i:s', strtotime($request->hour_friday_interval_out));
                $request['hour_friday_out'] = date('H:i:s', strtotime($request->hour_friday_out));
                $request['hour_saturday_in'] = date('H:i:s', strtotime($request->hour_saturday_in));
                $request['hour_saturday_interval_in'] = date('H:i:s', strtotime($request->hour_saturday_interval_in));
                $request['hour_saturday_interval_out'] = date('H:i:s', strtotime($request->hour_saturday_interval_out));
                $request['hour_saturday_out'] = date('H:i:s', strtotime($request->hour_saturday_out));
                $unity = Unity::create($request->all());
                UnityCashier::create(['unity' => $unity->id, 'amount' => 0, 'status' => 'FECHADO']);

                /*if (isset($request->categories)) {
                    foreach ($request->categories as $category) {
                        UnityCategory::where(['id' => $category['id']])->update(['unity' => $unity->id]);
                    }
                }*/
                /*if (isset($request->services)) {
                    foreach ($request->services as $service) {
                        UnityService::where(['id' => $service['id']])->update(['unity' => $unity->id]);
                    }
                }*/
                $this->storePermissionsDefaultUnity($unity->id);
                $this->storeCategoriesDefaultUnity($unity->id);
                $this->storeServicesDefaultUnity($unity->id);
                $this->storeSizesDefaultUnity($unity->id);
                $this->storeTypesDefaultUnity($unity->id);
                $this->storeBehaviorsDefaultUnity($unity->id);
                return $this->show($unity->id);
            } catch (Exception $error) {
                return response()->json(['error' => $error->getMessage()]);
            }
        }
    }

    public function storePermissionsDefaultUnity($unity) {
        $permission = Permission::create([
            'unity' => $unity,
            'description' => 'Administrador',
            'pets' => true,
            'daily' => true,
            'users' => true,
            'settings' => true,
            'cashier' => true,
            'vet' => true,
            'reports' => true,
            'products' => true,
            'tutors' => true,
            'units' => true,
            'invoices' => true,
            'status' => true
        ]);
        UserUnity::create(['user' => auth()->user()->id, 'unity' => $unity, 'permission' => $permission->id, 'status' => 'INACTIVE']);
    }

    public function storeCategoriesDefaultUnity($unity)
    {
        UnityCategory::create(['unity' => $unity, 'order' => 1, 'description' => 'Resort', 'module' => 'HOTEL', 'status' => true]);
        UnityCategory::create(['unity' => $unity, 'order' => 2, 'description' => 'Spa', 'module' => 'SHOWER', 'status' => true]);
        UnityCategory::create(['unity' => $unity, 'order' => 3, 'description' => 'Daycare', 'module' => 'DAY_CARE', 'status' => true]);
        UnityCategory::create(['unity' => $unity, 'order' => 4, 'description' => 'Pet Sitter', 'module' => 'PET_SITTER', 'status' => true]);
        UnityCategory::create(['unity' => $unity, 'order' => 5, 'description' => 'Outros Serviços', 'module' => 'OTHER', 'status' => true]);
    }

    public function storeServicesDefaultUnity($unity)
    {
        UnityService::create(['unity' => $unity, 'description' => 'Banho', 'type' => 'SHOWER', 'status' => true]);
        UnityService::create(['unity' => $unity, 'description' => 'Tosa', 'type' => 'SUB_SHOWER', 'status' => true]);
        UnityService::create(['unity' => $unity, 'description' => 'Hidratação', 'type' => 'SUB_SHOWER', 'status' => true]);
        UnityService::create(['unity' => $unity, 'description' => 'Tosa Higienica', 'type' => 'SUB_SHOWER', 'status' => true]);
        UnityService::create(['unity' => $unity, 'description' => 'Transporte', 'type' => 'TRANSPORT', 'status' => true]);
        UnityService::create(['unity' => $unity, 'description' => 'Pet Sitter', 'type' => 'PET_SITTER', 'status' => true]);
        UnityService::create(['unity' => $unity, 'description' => 'Creche', 'type' => 'DAY_CARE', 'status' => true]);
        UnityService::create(['unity' => $unity, 'description' => 'Hotel', 'type' => 'HOTEL', 'status' => true]);
        UnityService::create(['unity' => $unity, 'description' => 'Outros Serviços', 'type' => 'OTHER', 'status' => true]);
    }

    public function storeSizesDefaultUnity($unity)
    {
        PetSize::create(['unity' => $unity, 'description' => 'Pequeno']);
        PetSize::create(['unity' => $unity, 'description' => 'Médio']);
        PetSize::create(['unity' => $unity, 'description' => 'Grande']);
        PetSize::create(['unity' => $unity, 'description' => 'Gigante']);
        PetSize::create(['unity' => $unity, 'description' => 'Todos']);
    }

    public function storeTypesDefaultUnity($unity)
    {
        $typeDog = PetType::create(['unity' => $unity, 'description' => 'Cachorro']);
        $typeCat = PetType::create(['unity' => $unity, 'description' => 'Gato']);

        PetTypeFur::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pelo curto']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pelo longo']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pelo encaracolado']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pelagem dupla']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pelo longo e curto']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Escamas']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Sólido']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Tabby']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Branco']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Golden']);
        PetTypeFur::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Frajola']);

        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Akita']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Basset hound']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Beagle']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Bichon frisé']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Boiadeiro australiano']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Border collie']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Boston terrier']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Boxer']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Buldogue francês']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Buldogue inglês']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Bull terrier']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Cane corso']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Cavalier king charles spaniel']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Chihuahua']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Chow chow']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Cocker spaniel inglês']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Dachshund']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Dálmata']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Doberman']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Dogo argentino']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Dogue alemão']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Fila brasileiro']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Golden retriever']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Husky siberiano']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Jack russell terrier']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Labrador retriever']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Lhasa apso']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Lulu da pomerânia']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Maltês']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Mastiff inglês']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Mastim tibetano']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pastor alemão']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pastor australiano']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pastor de Shetland']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pequinês']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pinscher']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pit bull']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Poodle']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Pug']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Rottweiler']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Schnauzer']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Shar-pei']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Shiba']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Shih tzu']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Staffordshire bull terrier']);
        PetBreed::create(['unity' => $unity, 'type' => $typeDog->id, 'description' => 'Weimaraner']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Persa']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Siamês']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Himalaia']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Maine Coon']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Angorá']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Siberiano']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Sphynx']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Burmese']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'Ragdoll']);
        PetBreed::create(['unity' => $unity, 'type' => $typeCat->id, 'description' => 'British Shorthair']);
    }

    public function storeBehaviorsDefaultUnity($unity)
    {
        PetBehavior::create(['unity' => $unity, 'description' => 'Amigável']);
        PetBehavior::create(['unity' => $unity, 'description' => 'Calmo']);
        PetBehavior::create(['unity' => $unity, 'description' => 'Dócil']);
        PetBehavior::create(['unity' => $unity, 'description' => 'Teimoso']);
        PetBehavior::create(['unity' => $unity, 'description' => 'Travesso']);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $unity = Unity::findOrFail($id);
            $unity->cityObject = ($unity->city()->first()) ? $unity->city()->first() : [];
            $unity->provinceObject = ($unity->cityObject->province()->first()) ? $unity->cityObject->province()->first() : [];
            $unity->categories = ($unity->categories()->get()) ? $unity->categories()->get() : [];
            $unity->services = ($unity->services()->get()) ? $unity->services()->get() : [];
            $unity->hour_sunday_in = Carbon::parse($unity->hour_sunday_in);
            $unity->hour_sunday_interval_in = Carbon::parse($unity->hour_sunday_interval_in);
            $unity->hour_sunday_interval_out = Carbon::parse($unity->hour_sunday_interval_out);
            $unity->hour_sunday_out = Carbon::parse($unity->hour_sunday_out);
            $unity->hour_monday_in = Carbon::parse($unity->hour_monday_in);
            $unity->hour_monday_interval_in = Carbon::parse($unity->hour_monday_interval_in);
            $unity->hour_monday_interval_out = Carbon::parse($unity->hour_monday_interval_out);
            $unity->hour_monday_out = Carbon::parse($unity->hour_monday_out);
            $unity->hour_tuesday_in = Carbon::parse($unity->hour_tuesday_in);
            $unity->hour_tuesday_interval_in = Carbon::parse($unity->hour_tuesday_interval_in);
            $unity->hour_tuesday_interval_out = Carbon::parse($unity->hour_tuesday_interval_out);
            $unity->hour_tuesday_out = Carbon::parse($unity->hour_tuesday_out);
            $unity->hour_wednesday_in = Carbon::parse($unity->hour_wednesday_in);
            $unity->hour_wednesday_interval_in = Carbon::parse($unity->hour_wednesday_interval_in);
            $unity->hour_wednesday_interval_out = Carbon::parse($unity->hour_wednesday_interval_out);
            $unity->hour_wednesday_out = Carbon::parse($unity->hour_wednesday_out);
            $unity->hour_thursday_in = Carbon::parse($unity->hour_thursday_in);
            $unity->hour_thursday_interval_in = Carbon::parse($unity->hour_thursday_interval_in);
            $unity->hour_thursday_interval_out = Carbon::parse($unity->hour_thursday_interval_out);
            $unity->hour_thursday_out = Carbon::parse($unity->hour_thursday_out);
            $unity->hour_friday_in = Carbon::parse($unity->hour_friday_in);
            $unity->hour_friday_interval_in = Carbon::parse($unity->hour_friday_interval_in);
            $unity->hour_friday_interval_out = Carbon::parse($unity->hour_friday_interval_out);
            $unity->hour_friday_out = Carbon::parse($unity->hour_friday_out);
            $unity->hour_saturday_in = Carbon::parse($unity->hour_saturday_in);
            $unity->hour_saturday_interval_in = Carbon::parse($unity->hour_saturday_interval_in);
            $unity->hour_saturday_interval_out = Carbon::parse($unity->hour_saturday_interval_out);
            $unity->hour_saturday_out = Carbon::parse($unity->hour_saturday_out);
            return response()->json($unity, 200);
        } catch (Exception $error) {
            return response()->json(['error' => $error->getMessage(), 'code' => $error->getCode()]);
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
        try {
            $request['hour_sunday_in'] = date('H:i:s', strtotime($request->hour_sunday_in));
            $request['hour_sunday_interval_in'] = date('H:i:s', strtotime($request->hour_sunday_interval_in));
            $request['hour_sunday_interval_out'] = date('H:i:s', strtotime($request->hour_sunday_interval_out));
            $request['hour_sunday_out'] = date('H:i:s', strtotime($request->hour_sunday_out));
            $request['hour_monday_in'] = date('H:i:s', strtotime($request->hour_monday_in));
            $request['hour_monday_interval_in'] = date('H:i:s', strtotime($request->hour_monday_interval_in));
            $request['hour_monday_interval_out'] = date('H:i:s', strtotime($request->hour_monday_interval_out));
            $request['hour_monday_out'] = date('H:i:s', strtotime($request->hour_monday_out));
            $request['hour_tuesday_in'] = date('H:i:s', strtotime($request->hour_tuesday_in));
            $request['hour_tuesday_interval_in'] = date('H:i:s', strtotime($request->hour_tuesday_interval_in));
            $request['hour_tuesday_interval_out'] = date('H:i:s', strtotime($request->hour_tuesday_interval_out));
            $request['hour_tuesday_out'] = date('H:i:s', strtotime($request->hour_tuesday_out));
            $request['hour_wednesday_in'] = date('H:i:s', strtotime($request->hour_wednesday_in));
            $request['hour_wednesday_interval_in'] = date('H:i:s', strtotime($request->hour_wednesday_interval_in));
            $request['hour_wednesday_interval_out'] = date('H:i:s', strtotime($request->hour_wednesday_interval_out));
            $request['hour_wednesday_out'] = date('H:i:s', strtotime($request->hour_wednesday_out));
            $request['hour_thursday_in'] = date('H:i:s', strtotime($request->hour_thursday_in));
            $request['hour_thursday_interval_in'] = date('H:i:s', strtotime($request->hour_thursday_interval_in));
            $request['hour_thursday_interval_out'] = date('H:i:s', strtotime($request->hour_thursday_interval_out));
            $request['hour_thursday_out'] = date('H:i:s', strtotime($request->hour_thursday_out));
            $request['hour_friday_in'] = date('H:i:s', strtotime($request->hour_friday_in));
            $request['hour_friday_interval_in'] = date('H:i:s', strtotime($request->hour_friday_interval_in));
            $request['hour_friday_interval_out'] = date('H:i:s', strtotime($request->hour_friday_interval_out));
            $request['hour_friday_out'] = date('H:i:s', strtotime($request->hour_friday_out));
            $request['hour_saturday_in'] = date('H:i:s', strtotime($request->hour_saturday_in));
            $request['hour_saturday_interval_in'] = date('H:i:s', strtotime($request->hour_saturday_interval_in));
            $request['hour_saturday_interval_out'] = date('H:i:s', strtotime($request->hour_saturday_interval_out));
            $request['hour_saturday_out'] = date('H:i:s', strtotime($request->hour_saturday_out));
            $unity = Unity::findOrFail($id);
            $unity->update($request->all());

            if (isset($request->categories)) {
                foreach ($request->categories as $category) {
                    UnityCategory::where(['id' => $category['id']])->update(['unity' => $id]);
                }
            }
            if (isset($request->services)) {
                foreach ($request->services as $service) {
                    UnityService::where(['id' => $service['id']])->update(['unity' => $id]);
                }
            }
            return $this->show($id);
        } catch (Exception $error) {
            return response()->json(['error' => $error->getMessage(), 'code' => $error->getCode()]);
        }
    }

    public function disable(Request $request)
    {
        Unity::where([
            'id' => $request->id
        ])->update([
            'status' => ($request->status === 'ACTIVE') ? 'INACTIVE' : 'ACTIVE'
        ]);
        return $this->show($request->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $unity = Unity::findOrFail($id);
        $unity->delete();
        UserUnity::where('unity', $id)->delete();
        return $unity;
    }
}
