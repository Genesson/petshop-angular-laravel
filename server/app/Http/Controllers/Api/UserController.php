<?php

namespace App\Http\Controllers\Api;

use App\Models\Permission;
use App\Models\PetBreed;
use App\Models\PetSize;
use App\Models\PetType;
use App\Models\PetTypeFur;
use App\Models\Unity;
use DB;
use Exception;
use App\Http\Controllers\Controller;
use App\Models\City;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\UserUnity;
use App\Models\UserAdress;
use App\Models\UserAdditional;
use App\Models\Pet;
use App\Models\Province;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (auth()->user()) {
            $users = User::join('user_unities', 'users.id', '=', 'user_unities.user')
                ->where('users.role', 'CLIENT')
                ->where('user_unities.unity', auth()->user()->unity[0]['unity'])
                ->select('users.*')
                ->simplePaginate(10);

            foreach ($users as $user) {
                $user->cpf = ($user->cpf === null) ? 'Não informado' : $user->cpf;
                $user->phone = ($user->phone === null) ? 'Não informado' : $user->phone;
                $user->cell_phone = ($user->cell_phone === null) ? 'Não informado' : $user->cell_phone;
                $user->address = ($user->addresses()->first()) ? $user->addresses()->first() : [];
                $user->city = ($user->addresses()->first()) ? $user->addresses()->first()->city()->first() : [];
                $user->province = ($user->addresses()->first()) ? $user->addresses()->first()->province()->first() : [];
                $user->additional = ($user->additional()->first()) ? $user->additional()->first() : [];
                $user->pets = ($user->pets()->get()) ? $user->pets()->get() : [];
                $user->petsName = ($user->pets()->get()) ? $this->petsName($user->pets()->get()) : '';
            }
            return $users;
        }
    }

    public function search(Request $request)
    {
        $users = User::where('role', 'CLIENT')->where('name', 'LIKE', '%' . $request->filter . '%')->get();
        foreach ($users as $user) {
            $user->cpf = ($user->cpf === null) ? 'Não informado' : $user->cpf;
            $user->phone = ($user->phone === null) ? 'Não informado' : $user->phone;
            $user->cell_phone = ($user->cell_phone === null) ? 'Não informado' : $user->cell_phone;
            $user->address = ($user->addresses()->first()) ? $user->addresses()->first() : [];
            $user->city = ($user->addresses()->first()) ? $user->addresses()->first()->city()->first() : [];
            $user->province = ($user->addresses()->first()) ? $user->addresses()->first()->province()->first() : [];
            $user->additional = ($user->additional()->first()) ? $user->additional()->first() : [];
            $user->pets = ($user->pets()->get()) ? $user->pets()->get() : [];
            $user->petsName = ($user->pets()->get()) ? $this->petsName($user->pets()->get()) : '';
        }
        return $users;
    }

    public function petsName($pets)
    {
        $petsName = '';
        foreach ($pets as $pet) {
            $petsName .= $pet->name . ', ';
        }
        return (strlen($petsName) > 0) ? substr(trim($petsName), 0, -1) : '';
    }

    public function loadPerAdmin($id)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            if (auth()->user()->role != 'ADMIN') {
                $users = User::join('user_unities', 'users.id', '=', 'user_unities.user')
                    ->where('users.role', '<>', 'CLIENT')
                    ->where('users.role', '<>', 'ADMIN')
                    ->where('user_unities.unity', auth()->user()->unity[0]['unity'])
                    ->select('users.*')
                    ->get();
            } else {
                $users = User::join('user_unities', 'users.id', '=', 'user_unities.user')
                    ->where('users.role', '<>', 'CLIENT')
                    ->where('user_unities.unity', auth()->user()->unity[0]['unity'])
                    ->select('users.*')
                    ->get();
            }

            foreach ($users as $user) {
                $user->units = ($user->unities()->get()) ? $user->unities()->get() : [];
                $user->unitsName = '';
                $user->permissionsName = '';
                $user->unitsName = $this->unitsName($user->id);
                $user->permissionsName = $this->permissionsName($user->id);
            }
            return $users;
        }
    }

    public function loadPerAdminUnity($id)
    {
        $users = User::join('user_unities', 'users.id', '=', 'user_unities.user')
            ->where('users.role', '<>', 'CLIENT')
            ->where('user_unities.unity', auth()->user()->unity[0]['unity'])
            ->select('users.*')
            ->get();

        foreach ($users as $user) {
            $user->units = ($user->unities()->get()) ? $user->unities()->get() : [];
            $user->unitsName = '';
            $user->permissionsName = '';
            $user->unitsName = $this->unitsName($user->id);
            $user->permissionsName = $this->permissionsName($user->id);
        }
        return $users;
    }

    public function unitsName($user)
    {
        $unitsName = '';
        $UserUnits = UserUnity::where('user', $user)->get();
        foreach ($UserUnits as $unity) {
            $unit = Unity::where('id', $unity->unity)->first();
            $permission = Permission::where('id', $unity->permission)->first();
            $unitsName .= $unit->fantasy . ' (' . $permission->description . '), ';
        }
        return substr(trim($unitsName), 0, -1);
    }

    public function permissionsName($user)
    {
        $permissionsName = '';
        $UserUnits = UserUnity::where('user', $user)->get();
        foreach ($UserUnits as $unity) {
            $permission = Permission::where('id', $unity->permission)->first();
            $permissionsName .= $permission->description . ', ';
        }
        return substr(trim($permissionsName), 0, -1);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (isset($request->re_password) && $request->password != $request->re_password) {
            return response()->json(['erro' => true, 'message' => 'Senhas nao coincidem.'], 500);
        }
        $data = [
            'avatar' => $request->avatar,
            'foreign' => $request->foreign,
            'name' => $request->name,
            'date_birth' => $request->date_birth,
            'email' => $request->email,
            'phone_residential' => $request->phone_residential,
            'phone_company' => $request->phone_company,
            'phone' => $request->phone,
            'cell_phone' => $request->cell_phone,
            'rg' => $request->rg,
            'cpf' => $request->cpf,
            'document' => $request->document,
            'passport' => $request->passport,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status
        ];

        try {
            $user = User::create($data);

            if ($request->role === 'CLIENT') {
                // $userUnity = [
                //     'user' => $user->id,
                //     'unity' => auth()->user()->unity[0]['unity'],
                //     'status' => 'ACTIVE'
                // ];
                // UserUnity::create($userUnity);
            } else {
                $i = 0;
                foreach ($request->units as $unity) {
                    $existUserUnity = UserUnity::where([['user', $user->id], ['unity', $unity['unity']]])->exists();
                    if (!$existUserUnity) {
                        $userUnity = [
                            'user' => $user->id,
                            'unity' => $unity['unity'],
                            'permission' => $unity['permission'],
                            'status' => ($i === 0) ? 'ACTIVE' : 'INACTIVE'
                        ];
                        UserUnity::create($userUnity);
                    }
                    $i++;
                }
            }

            $address = [
                'user' => $user->id,
                'zipcode' => $request->address['zipcode'],
                'street' => $request->address['street'],
                'number' => $request->address['number'],
                'district' => $request->address['district'],
                'country' => $request->address['country'],
                'province' => $request->address['province'],
                'city' => $request->address['city']
            ];
            $additional = [
                'user' => $user->id,
                'found_us' => $request->additional['found_us'],
                'additional_one' => $request->additional['additional_one'],
                'additional_two' => $request->additional['additional_two'],
                'additional_three' => $request->additional['additional_three'],
                'obs_general' => $request->additional['obs_general'],
                'has_services' => $request->additional['has_services'],
                'special_attention' => $request->additional['special_attention'],
                'attention' => $request->additional['attention'],
                'obs_alert' => $request->additional['obs_alert']
            ];
            if (isset($request->pets)) {
                foreach ($request->pets as $pet) {
                    Pet::where(['id' => $pet['id']])->update(['user' => $user->id]);
                }
            }
            $user->address = UserAdress::create($address);
            $user->city = ($user->addresses()->first()) ? $user->addresses()->first()->city()->first() : [];
            $user->additional = UserAdditional::create($additional);
            $user->pets = $request->pets;

            if ($request->role !== 'CLIENT') {
                $user->units = ($user->unities()->get()) ? $user->unities()->get() : [];

                $user->unitsName = '';
                $user->permissionsName = '';
                $user->unitsName = $this->unitsName($user->id);
                $user->permissionsName = $this->permissionsName($user->id);
            }

            // $this->sendEmail($user, $request->password);

            return response()->json($user, 200);
        } catch (Exception $e) {
            if (isset($e->errorInfo[0]) && $e->errorInfo[0] == '23000') {
                return response()->json(['erro' => true, 'message' => 'Esse email já foi usado por outra conta.'], 500);
            }
            return response()->json(['erro' => true, 'message' => $e->getMessage()], 500);
        }
    }

    public function sendEmail($user, $password)
    {
        try {
            $authController = new AuthController();
            $authController->sendAccessDataMail($user, $password);
        } catch (Exception $e) {
            return response()->json(['erro' => true, 'message' => 'Erro ao enviar email.'], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::findOrFail($id);

        $user->address = ($user->addresses()->first()) ? $user->addresses()->first() : [];
        $user->city = ($user->addresses()->first()) ? $user->addresses()->first()->city()->first() : [];
        $user->province = ($user->addresses()->first()) ? $user->addresses()->first()->province()->first() : [];
        $user->additional = ($user->additional()->first()) ? $user->additional()->first() : [];
        $user->pets = ($user->pets()->get()) ? $user->pets()->get() : [];
        return response()->json($user, 200);
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
        if ($request->second_name) {
            User::where(['id' => $request->id])->update([
                'second_name' => $request->second_name,
                'second_cpf' => $request->second_cpf,
                'second_phone' => $request->second_phone
            ]);

            return $this->show($request->id);
        }


        if (isset($request->password)) {
            if ($request->password != $request->re_password) {
                return response()->json(['erro' => true, 'message' => 'Senhas nao coincidem.'], 500);
            }

            $data = [
                'avatar' => $request->avatar,
                'foreign' => $request->foreign,
                'name' => $request->name,
                'date_birth' => $request->date_birth,
                'email' => $request->email,
                'phone_residential' => $request->phone_residential,
                'phone_company' => $request->phone_company,
                'phone' => $request->phone,
                'cell_phone' => $request->cell_phone,
                'rg' => $request->rg,
                'cpf' => $request->cpf,
                'document' => $request->document,
                'passport' => $request->passport,
                'password' => Hash::make($request->password),
                'role' => $request->role,
                'status' => $request->status
            ];
        } else {
            $data = [
                'avatar' => $request->avatar,
                'foreign' => $request->foreign,
                'name' => $request->name,
                'date_birth' => $request->date_birth,
                'email' => $request->email,
                'phone_residential' => $request->phone_residential,
                'phone_company' => $request->phone_company,
                'phone' => $request->phone,
                'cell_phone' => $request->cell_phone,
                'rg' => $request->rg,
                'cpf' => $request->cpf,
                'document' => $request->document,
                'passport' => $request->passport,
                'role' => $request->role,
                'status' => $request->status
            ];
        }

        try {
            $user = User::findOrFail($id);
            $user->update($data);

            if ($request->role === 'CLIENT') {
                UserUnity::where('user', $user->id)->delete();
                $userUnity = [
                    'user' => $user->id,
                    'unity' => auth()->user()->unity[0]['unity'],
                    'status' => 'ACTIVE'
                ];
                UserUnity::create($userUnity);
            } else {
                $i = 0;
                UserUnity::where('user', $user->id)->delete();
                foreach ($request->units as $unity) {
                    $existUserUnity = UserUnity::where([['user', $user->id], ['unity', $unity['unity']]])->exists();
                    if (!$existUserUnity) {
                        $userUnity = [
                            'user' => $user->id,
                            'unity' => $unity['unity'],
                            'permission' => $unity['permission'],
                            'status' => ($i === 0) ? 'ACTIVE' : 'INACTIVE'
                        ];
                        UserUnity::create($userUnity);
                    }
                    $i++;
                }
            }

            try {
                $address = UserAdress::firstOrNew(array('user' => $id));
                $address->user = $id;
                $address->zipcode = $request->address['zipcode'];
                $address->street = $request->address['street'];
                $address->number = $request->address['number'];
                $address->district = $request->address['district'];
                $address->country = $request->address['country'];
                $address->province = $request->address['province'];
                $address->city = $request->address['city'];
                $address->save();
            } catch (Exception $errAdress) {
                return response()->json(['erro' => true, 'message' => $errAdress->getMessage()]);
            }

            try {
                $additional = UserAdditional::firstOrNew(array('user' => $id));
                $additional->user = $id;
                $additional->found_us = $request->additional['found_us'];
                $additional->additional_one = $request->additional['additional_one'];
                $additional->additional_two = $request->additional['additional_two'];
                $additional->additional_three = $request->additional['additional_three'];
                $additional->obs_general = $request->additional['obs_general'];
                $additional->has_services = $request->additional['has_services'];
                $additional->special_attention = $request->additional['special_attention'];
                $additional->attention = $request->additional['attention'];
                $additional->obs_alert = $request->additional['obs_alert'];
                $additional->save();
            } catch (Exception $errAdditional) {
                return response()->json(['erro' => true, 'message' => $errAdditional->getMessage()]);
            }

            if (isset($request->pets)) {
                foreach ($request->pets as $pet) {
                    Pet::where(['id' => $pet['id']])->update(['user' => $user->id]);
                }
            }

            $user->address = $address;
            $user->city = ($user->addresses()->first()) ? $user->addresses()->first()->city()->first() : [];
            $user->additional = $additional;
            $user->pets = $request->pets;

            if ($request->role !== 'CLIENT') {
                $user->units = ($user->unities()->get()) ? $user->unities()->get() : [];

                $user->unitsName = '';
                $user->permissionsName = '';
                $user->unitsName = $this->unitsName($user->id);
                $user->permissionsName = $this->permissionsName($user->id);
            }

            return response()->json($user, 200);
        } catch (Exception $e) {
            return response()->json(['erro' => true, 'message' => $e->getMessage()]);
        }
    }

    public function updateUnity(Request $request)
    {
        $inactive = UserUnity::where(['user' => auth()->user()->id])->update(['status' => 'INACTIVE']);
        if ($inactive) {
            UserUnity::where(['unity' => $request->id])->update(['status' => 'ACTIVE']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        UserAdress::where('user', $id)->delete();
        UserAdditional::where('user', $id)->delete();
        Pet::where('user', $id)->delete();

        $user = User::findOrFail($id);
        $user->delete();

        return $user;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function pets_csv_import(Request $request)
    {
        $gender = ['MALE' => 'MALE', 'MACHO' => 'MALE', 'Macho' => 'MALE', 'macho' => 'MALE', 'FEMALE' => 'FEMALE', 'femea' => 'FEMALE', 'fêmea' => 'FEMALE', 'Fêmea' => 'FEMALE', 'Femea' => 'FEMALE', 'FEMEA' => 'FEMALE'];

        if (!$request->hasFile('csv')) {
            return response()->json(["status" => "error", "message" => "Arquivo não enviado"], 400);
        }

        $file = $request->file('csv');
        $file = fopen($file, 'r');
        $currentLine = 0;
        $toReturn = 'first';
        while (!feof($file)) {
            $line = fgets($file);
            $line = mb_convert_encoding($line, 'UTF-8', 'UTF-8');

            // $al == array line
            $al = explode(';', $line);

            // $pd == pets data
            $pd = [];

            //declaração de campos na tabela
            if ($al && $currentLine > 0 && count($al) > 2) {

                try {

                    $toReturn = mb_strtolower(trim($this->utf8Fix($al[8])));

                    // user assignment
                    $pd['user'] = User::where(['cod_erp' => (int)trim(str_replace('"', "", $this->utf8Fix($al[1])))])->first()->id ?? null;
                    if ($pd['user'] != null) {
                        $type = $this->getPetType(mb_strtolower(trim(str_replace('"', "", $this->utf8Fix($al[2])))));
                        $pd['type'] = $type->id ?? null;
                        $pd['breed'] = $this->getPetBreed(mb_strtolower(trim($this->utf8Fix($al[3]))), $type)->id ?? null;
                        $pd['name'] = trim(str_replace('"', "", $this->utf8Fix($al[4])));
                        $pd['alive'] = $this->utf8Fix($al[5]) < 1 ? false : true;
                        if ($al[6] != null)
                            $pd['gender'] = trim(str_replace('"', "", $this->utf8Fix($al[6]) != null ? $this->utf8Fix($al[6]) : "Femea"));
                        else
                            $pd['gender'] = $gender['femea'];

                        $pd['gender'] = $gender[$pd['gender']];

                        $pd['castrated'] = $this->utf8Fix($al[7]) < 1 || $this->utf8Fix($al[7]) == null ? false : true;
                        if ($al[7] == null)
                            $pd['castrated'] = null;

                        $pd['date_birth'] = trim(str_replace('"', "", $this->utf8Fix($al[8])));
                        $pd['date_birth'] = trim(str_replace(" 00:00:00", "", $pd['date_birth']));
                        $pd['date_birth'] = $this->brDateFormat($pd['date_birth']);

                        if ($al[11] != null)
                            $pd['size'] = $this->getPetSize(mb_strtolower(trim(str_replace('"', "", $this->utf8Fix($al[11])))))->id ?? null;

                        if ($al[12] != null)
                            $pd['type_fur'] = $this->getPetTypeFur(mb_strtolower(trim(str_replace('"', "", $this->utf8Fix($al[12])))), $type)->id ?? null;

                        if ($al[14] != null && $al[16] == null)
                            $pd['obs_general'] = trim(str_replace('"', "", $this->utf8Fix($al[14])));
                        if ($al[14] != null && $al[16] != null)
                            $pd['obs_general'] = trim(str_replace('"', "", $this->utf8Fix($al[14]))) . "; " . trim(str_replace('"', "", $this->utf8Fix($al[16])));
                        if ($al[14] == null && $al[16] != null)
                            $pd['obs_general'] = trim(str_replace('"', "", $this->utf8Fix($al[16])));

                        $pd['obs_medical'] = trim(str_replace('"', "", $this->utf8Fix($al[15])));

                        if ($al[18] && $al[18] == 1)
                            $pd['status'] = 'ACTIVE';
                        else
                            $pd['status'] = null;

                        $pd['unity'] = auth()->user()->unity[0]['unity'];

                        Pet::create($pd);

                    }

                } catch (Exception $e) {
                    return response()->json(["status" => "error", "message" => $toReturn . " " . $e->getMessage()], 400);
                }

            }
            $currentLine++;
        }
        return $this->index();
    }

    /**
     * @param $description
     * @param PetType $petType
     * @return mixed
     */
    public function getPetTypeFur($description, PetType $petType)
    {
        $typeFur = PetTypeFur::where('description', 'LIKE', '%' . mb_strtolower($description) . '%')->where('unity', '=', auth()->user()->unity[0]['unity'])->where('type', '=', $petType->id ?? null)->first();

        if ($typeFur == null) {
            $petTypeFur = [
                'unity' => auth()->user()->unity[0]['unity'],
                'description' => $description,
                'type' => $petType->id ?? null
            ];
            return PetTypeFur::create($petTypeFur);
        }

        return $typeFur;
    }

    /**
     * @param $description
     * @return mixed
     */
    public function getPetSize($description)
    {
        $size = PetSize::where('description', 'LIKE', '%' . mb_strtolower($description) . '%')->where('unity', '=', auth()->user()->unity[0]['unity'])->first();

        if ($size == null) {
            $petSize = [
                'unity' => auth()->user()->unity[0]['unity'],
                'description' => $description
            ];
            return PetSize::create($petSize);
        }

        return $size;
    }

    /**
     * @param $description
     */
    public function getPetType($description)
    {

        if ($description == 'canino')
            $description = 'Cachorro';
        if ($description == 'felino')
            $description = 'Gato';

        $type = PetType::where('description', 'LIKE', '%' . mb_strtolower($description) . '%')->where('unity', '=', auth()->user()->unity[0]['unity'])->first();

        if ($type == null) {
            $petType = [
                'unity' => auth()->user()->unity[0]['unity'],
                'description' => $description
            ];
            return PetType::create($petType);
        }

        return $type;
    }

    /**
     * @param $description
     * @param PetType $petType
     * @return mixed
     */
    public function getPetBreed($description, PetType $petType)
    {
        $breed = PetBreed::where('description', 'LIKE', '%' . mb_strtolower($description) . '%')->where('unity', '=', auth()->user()->unity[0]['unity'])->where('type', '=', $petType->id ?? null)->first();

        if ($breed == null) {
            $petBreed = [
                'unity' => auth()->user()->unity[0]['unity'],
                'description' => $description,
                'type' => $petType->id ?? null
            ];
            return PetBreed::create($petBreed);
        }

        return $breed;
    }

    public function contact_csv_import(Request $request)
    {

        if (!$request->hasFile('csv')) {
            return response()->json(["status" => "error", "message" => "Arquivo não enviado"], 400);
        }

        $file = $request->file('csv');
        $file = fopen($file, 'r');
        $currentLine = 0;

        while (!feof($file)) {
            $line = fgets($file);
            $line = mb_convert_encoding($line, 'UTF-8', 'UTF-8');

            // $al == array line
            $al = explode(';', $line);

            // $ud == user data
            $ud = [];

            $toReturn = 'first';
            //declaração de campos na tabela
            if ($al && $currentLine > 0 && count($al) > 2) {

                try {

                    $user = User::where(['cod_erp' => (int)trim(str_replace('"', "", $this->utf8Fix($al[0])))])->first();

                    $toReturn = (str_replace('"', "", $this->utf8Fix($al[4])));

                    if ($user != null) {
                        if (trim(str_replace('"', "", $al[2])) == "Celular") {
                            $ud['cell_phone'] = "(" . trim(str_replace('"', "", $al[3])) . ")" . trim(str_replace('"', "", $al[4]));
                        } else if (trim(str_replace('"', "", $al[2])) == "Residencial") {
                            $ud['phone_residential'] = "(" . trim(str_replace('"', "", $al[3])) . ")" . trim(str_replace('"', "", $al[4]));;
                        } else {
                            $ud['phone'] = "(" . trim(str_replace('"', "", $al[3])) . ")" . trim(str_replace('"', "", $al[4]));;
                        }

                        $user->fill($ud);

                        $user->save();
                    }

                } catch (Exception $e) {
                    return response()->json(["status" => "error", "message" => $toReturn . " " . $e->getMessage()], 400);
                }

            }
            $currentLine++;
        }
//        return response()->json(['erro' => false], 200);
        return $this->index();
    }

    public function import_csv(Request $request)
    {

        if (!$request->hasFile('csv')) {
            return response()->json(["status" => "error", "message" => "Arquivo não enviado"], 400);
        }

        $gender = ['masculino' => 'MALE', 'feminino' => 'FEMALE'];

        $file = $request->file('csv');
        $file = fopen($file, 'r');
        $currentLine = 0;

        while (!feof($file)) {
            $line = fgets($file);
            $line = mb_convert_encoding($line, 'UTF-8', 'UTF-8');

            // $al == array line
            $al = explode(';', $line);
            // $ud == user data
            $ud = [];

            $toReturn = 'first';

            //declaração de campos na tabela
            if ($al && $currentLine > 0 && count($al) > 2) {

                try {

                    // user assignment
                    $ud['role'] = "CLIENT";
                    $ud['cod_erp'] = (int)trim(str_replace('"', "", $this->utf8Fix($al[0])));

                    $toReturn = trim(str_replace('"', "", $this->utf8Fix($al[0])));

                    $ud['cpf'] = trim(str_replace('"', "", $this->utf8Fix($al[1])));
                    $ud['rg'] = trim(str_replace('"', "", $this->utf8Fix($al[2])));

                    $ud['name'] = trim(str_replace('"', "", $this->utf8Fix($al[3])));
                    $ud['gender'] = trim(str_replace('"', "", $this->utf8Fix($al[4]) != null ? $this->utf8Fix($al[4]) : "Feminino"));
                    $ud['gender'] = $gender[strtolower($ud['gender'])];
                    $ud['date_birth'] = trim(str_replace('"', "", $this->utf8Fix($al[5])));
                    $ud['date_birth'] = $this->brDateFormat($ud['date_birth']);

                    $ud['email'] = $this->getEmail($ud, trim(str_replace('"', "", $this->utf8Fix($al[16]))));

                    // address assignment
                    $ua['street'] = trim(str_replace('"', "", $this->utf8Fix($al[6])));
                    $ua['number'] = trim(str_replace('"', "", $this->utf8Fix($al[7])));
                    $ua['complement'] = trim(str_replace('"', "", $this->utf8Fix($al[8])));
                    $ua['district'] = trim(str_replace('"', "", $this->utf8Fix($al[9])));
                    $ua['zipcode'] = trim(str_replace('"', "", $this->utf8Fix($al[10])));

                    $ua['province'] = $this->getProvince($ud, trim(str_replace('"', "", $this->utf8Fix($al[12]))));

                    $ua['city'] = $this->getCity($ua, trim(str_replace('"', "", $this->utf8Fix($al[11]))), $ua['province']);

                    $ua['country'] = 1;

                } catch (Exception $e) {
                    return response()->json(["status" => "error", "message" => $toReturn . " " . $e->getMessage()], 400);
                }

                $this->makeUserImport(
                    $ud,
                    null,
                    $ua
                );
            }
            $currentLine++;
        }
//        return response()->json(['erro' => false], 200);
        return $this->index();
    }

    /**
     * Get city to import
     *
     * @param $ua
     * @param $provinceToFind
     * @return |null
     */
    private function getCity($ua, $cityToFind, $provinceToFind)
    {

        if ($provinceToFind == null)
            return null;

        if ($provinceToFind) {
            $ua['city'] = City::where('name', 'like', "%" . $cityToFind . "%")->where('province', $provinceToFind)->first();
            $ua['city'] = $ua['city']->id ?? null;
        }

        return $ua['city'];

    }

    /**
     * Get province to import
     *
     * @param $ua
     * @param $provinceToFind
     * @return |null
     */
    private function getProvince($ua, $provinceToFind)
    {

        if ($provinceToFind == null)
            return null;

        $ua['province'] = Province::where('initials', $provinceToFind)->first();
        $ua['province'] = $ua['province']->id ?? null;

        return $ua['province'];

    }

    /**
     * Get email to importing. If email exists in database, return the cod_erp concatenated with email
     *
     * @param $ud
     * @param $emailToFind
     * @return string|string[]
     */
    private function getEmail($ud, $emailToFind)
    {

        if ($emailToFind == null)
            return ((string)$ud['cod_erp']) . '@exemplo.com';

        if (User::where(['email' => $emailToFind])->first() == null)
            return $this->utf8Fix($emailToFind);

        return ((string)$ud['cod_erp']) . $this->utf8Fix($emailToFind);

    }

    /**
     * @param $ud
     * @param $up
     * @param $ua
     */
    private function makeUserImport($ud, $up, $ua)
    {
        $user = new User();
        $user->fill($ud);
        if ($user->save()) {

            if ($ua != null)
                $user->addresses()->create($ua);

            if ($up != null)
                foreach ($up as $value) {
                    if ($value && strlen($value)) {
                        $user->pets()->create(['name' => $value]);
                    }
                }
        }
        // RELACIONA USUÁRIO A UNIDADE
        $userUnity = [
            'user' => $user->id,
            'unity' => auth()->user()->unity[0]['unity'],
            'status' => 'ACTIVE'
        ];
        UserUnity::create($userUnity);
    }

    private function utf8Fix($msg)
    {
        $accents = array("á", "à", "â", "ã", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "ô", "õ", "ö", "ú", "ù", "û", "ü", "ç", "Á", "À", "Â", "Ã", "Ä", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ó", "Ò", "Ô", "Õ", "Ö", "Ú", "Ù", "Û", "Ü", "Ç");
        $utf8 = array("Ã¡", "Ã ", "Ã¢", "Ã£", "Ã¤", "Ã©", "Ã¨", "Ãª", "Ã«", "Ã­", "Ã¬", "Ã®", "Ã¯", "Ã³", "Ã²", "Ã´", "Ãµ", "Ã¶", "Ãº", "Ã¹", "Ã»", "Ã¼", "Ã§", "Ã", "Ã€", "Ã‚", "Ãƒ", "Ã„", "Ã‰", "Ãˆ", "ÃŠ", "Ã‹", "Ã", "ÃŒ", "ÃŽ", "Ã", "Ã“", "Ã’", "Ã”", "Ã•", "Ã–", "Ãš", "Ã™", "Ã›", "Ãœ", "Ã‡");
        $fix = str_replace($utf8, $accents, $msg);
        return $fix;
    }

    function brDateFormat($date)
    {
        if (!$date || !strlen($date)) return null;
        $ex = explode("/", $date);
        if (sizeof($ex) < 3) return null;
        return $ex[2] . "-" . $ex[1] . "-" . $ex[1];
    }
}
