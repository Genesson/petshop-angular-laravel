<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $fillable = [
        'cod_erp',
        'avatar',
        'foreign',
        'name',
        'date_birth',
        'cpf',
        'rg',
        'document',
        'passport',
        'phone',
        'cell_phone',
        'email',
        'phone_residential',
        'phone_company',
        'password',
        'second_name',
        'second_cpf',
        'second_phone',
        'role',
        'gender',
        'status'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];


    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function getJWTIdentifier()
    {
        return $this->id;
    }


    public function getJWTCustomClaims()
    {
        return [
            'name' => $this->name,
            'email' => $this->email
        ];
    }

    public function addresses()
    {
        return $this->hasMany(UserAdress::class, 'user', 'id');
    }

    public function additional()
    {
        return $this->hasMany(UserAdditional::class, 'user', 'id');
    }

    public function pets()
    {
        return $this->hasMany(Pet::class, 'user', 'id');
    }

    public function unity()
    {
        $units = $this->hasMany(UserUnity::class, 'user', 'id')->where('user_unities.status', '=', 'ACTIVE');
        return $units;
    }

    public function unities()
    {
        $units = $this->hasMany(UserUnity::class, 'user', 'id');
        return $units;
    }
}
