<?php

namespace App\Http\Controllers\Api;

use App\Models\Permission;
use App\Models\Unity;
use App\Models\UnityCategory;
use App\Models\UnityService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Hash;
use App\Mail\NewUser;
use App\Models\User;
use App\Models\UserUnity;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        if (!\Request()->token) {
            $this->middleware('auth:api', ['except' => ['login', 'logout', 'forgot', 'check', 'refresh']]);
        }
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        $user = User::select('id', 'role', 'cpf')->where('email', $credentials['email'])->first();
        if (isset($user) && $user['role'] != 'CLIENT') {
            $userUnity = UserUnity::where([['user', $user->id], ['status', 'ACTIVE']])->exists();
            if (!$userUnity) {
                $userUnity = UserUnity::select('id')
                    ->where([['user', $user->id], ['status', 'INACTIVE']])
                    ->orderBy('id', 'asc')
                    ->first();

                if ($userUnity) {
                    UserUnity::where('id', $userUnity->id)->update(['status' => 'ACTIVE']);
                }
            }
        }

        if (!$token = auth()->setTTL(240)->attempt($credentials)) {
            return response()->json(['erro' => true, 'message' => 'Usuário ou senha incorreto!'], 401);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json([
            'id' => auth()->user()->id,
            'name' => auth()->user()->name,
            'email' => auth()->user()->email,
            'role' => auth()->user()->role,
            'avatar' => auth()->user()->avatar,
        ]);
    }


    /**
     * Check if user is logedin
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function check()
    {
        return response()->json(['token' => auth()->check()]);
    }


    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        if (auth()->check()) {
            return $this->respondWithToken(auth()->setTTL(240)->refresh());
        } else {
            return response()->json(['erro' => true, 'message' => 'Token Inválido']);
        }
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */

    protected function respondWithToken($token)
    {
        if (auth()->user()->role != 'CLIENT') {
            if (auth()->user()->unity[0]['unity']) {

                if (auth()->user()->role != 'ADMIN') {
                    $unity = Unity::select('status')->where('id', auth()->user()->unity[0]['unity'])->first();
                    if ($unity->status === 'INACTIVE') {
                        return response()->json([
                            'message' => 'Unidade desativada, entre em contato com o suporte!'
                        ], 500);
                    }
                }

                $unityId = auth()->user()->unity[0]['unity'];
                $permission = $this->permissionsName(auth()->user()->unity[0]['permission']);
                $unity = Unity::findOrFail($unityId);
                $categories = UnityCategory::where([['unity', '=', $unityId], ['status', '=', 1]])->get();
                $services = UnityService::where([['unity', '=', $unityId], ['type', '<>', 'SUB_SHOWER']])->get();
                $serviceShower = UnityService::where([['unity', '=', $unityId], ['type', 'LIKE', '%SHOWER']])->get();
                foreach ($serviceShower as $shower) {
                    $shower['category'] = UnityCategory::where([['unity', '=', $unityId], ['module', '=', 'SHOWER']])->first();
                }
                $serviceOther = UnityService::select('id')->where([['unity', '=', $unityId], ['type', '=', 'OTHER']])->first();
                $serviceOthers = UnityService::where([['unity', '=', $unityId], ['service', '=', $serviceOther->id]])->get();
                foreach ($serviceOthers as $other) {
                    $other['category'] = UnityCategory::where([['unity', '=', $unityId], ['module', '=', 'OTHER']])->first();
                }
                $serviceHotel = UnityService::where(['unity' => $unityId, 'type' => 'HOTEL'])->first();
                $serviceHotel['category'] = ($serviceHotel->category()->first()) ? $serviceHotel->category()->first() : [];
                $serviceSitter = UnityService::where(['unity' => $unityId, 'type' => 'PET_SITTER'])->first();
                $serviceSitter['category'] = ($serviceSitter->category()->first()) ? $serviceSitter->category()->first() : [];
                $serviceDaycare = UnityService::where([['unity', '=', $unityId], ['type', 'DAY_CARE']])->first();
                $serviceDaycare['category'] = ($serviceDaycare->category()->first()) ? $serviceDaycare->category()->first() : [];
            }
        }
        return response()->json([
            'accessToken' => $token,
            'refreshToken' => $token,
            'IdToken' => $token,
            'tokenType' => 'bearer',
            'expiresIn' => auth('api')->factory()->getTTL() * 60,
            'user' => [
                'id' => auth()->user()->id,
                'unity' => isset($unity) ? $unity->id : null,
                'permission' => isset($permission) ? $permission : [],
                'unityFull' => isset($unity) ? $unity : [],
                'categories' => isset($categories) ? $categories : [],
                'services' => isset($services) ? $services : [],
                'serviceShower' => isset($serviceShower) ? $serviceShower : [],
                'serviceOthers' => isset($serviceOthers) ? $serviceOthers : [],
                'serviceHotel' => isset($serviceHotel) ? $serviceHotel : [],
                'serviceSitter' => isset($serviceSitter) ? $serviceSitter : [],
                'serviceDaycare' => isset($serviceDaycare) ? $serviceDaycare : [],
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'cpf' => auth()->user()->cpf,
                'role' => auth()->user()->role,
                'avatar' => auth()->user()->avatar,
            ],
        ]);
    }

    public function permissionsName($permission)
    {
        $permission = Permission::where('id', $permission)->first();
        $permissionsName = [auth()->user()->role];
        if ($permission->pets) {
            array_push($permissionsName, 'PETS');
        }
        if ($permission->daily) {
            array_push($permissionsName, 'DAILY');
        }
        if ($permission->users) {
            array_push($permissionsName, 'USERS');
        }
        if ($permission->settings) {
            array_push($permissionsName, 'SETTINGS');
        }
        if ($permission->cashier) {
            array_push($permissionsName, 'CASHIER');
        }
        if ($permission->vet) {
            array_push($permissionsName, 'VET');
        }
        if ($permission->reports) {
            array_push($permissionsName, 'REPORTS');
        }
        if ($permission->products) {
            array_push($permissionsName, 'PRODUCTS');
        }
        if ($permission->tutors) {
            array_push($permissionsName, 'TUTORS');
        }
        if ($permission->units) {
            array_push($permissionsName, 'UNITS');
        }
        if ($permission->invoices) {
            array_push($permissionsName, 'INVOICES');
        }
        return $permissionsName;
    }


    public function forgot(Request $request)
    {

        try {
            $user = User::whereEmail($request->email)->first();

            if ($user) {
                $pass = rand(1000000, 99999999);
                $user->password = bcrypt($pass);
                $user->save();
                return $this->sendAccessDataMail($user, $pass);
            }
        } catch (\Throwable $th) {
            return response()->json([], 500);
        }
    }

    public function sendAccessDataMail($user, $pass)
    {
        $data = $user;
        $data['pass'] = $pass;
        $data['to'] = $user->email;
        Mail::to($data['to'])->send(new NewUser($data));
        return response()->json([], 200);
    }
}
