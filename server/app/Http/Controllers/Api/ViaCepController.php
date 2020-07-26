<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Province;
use App\Models\City;

class ViaCepController extends Controller
{
    public function index($cep)
    {
        $cr = curl_init();
        curl_setopt($cr, CURLOPT_HEADER, false);
        curl_setopt($cr, CURLOPT_URL, 'https://viacep.com.br/ws/' . $cep . '/json');
        curl_setopt($cr, CURLOPT_RETURNTRANSFER, true);
        $dados = json_decode(curl_exec($cr), true);
        curl_close($cr);

        $province = Province::where('initials', $dados['uf'])->first();
        $city = City::where([['name', $dados['localidade']], ['province', $province->id]])->first();

        $data = [];
        $item['id'] = 1;
        $item['cep'] = $dados['cep'];
        $item['logradouro'] = $dados['logradouro'];
        $item['complemento'] = $dados['complemento'];
        $item['bairro'] = $dados['bairro'];
        $item['localidade'] = $dados['localidade'];
        $item['uf'] = $dados['uf'];
        $item['city'] = isset($city->id) ? $city->id : '';
        $item['province'] = isset($province->id) ? $province->id : '';
        $item['unidade'] = $dados['unidade'];
        $item['ibge'] = $dados['ibge'];
        $item['gia'] = $dados['gia'];
        array_push($data, $item);
        return $data;
    }
}
