<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\UnityCashier;

class UnityCashierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (auth()->user()) {
            $unity = auth()->user()->unity[0]['unity'];
            $cashier = UnityCashier::where(['unity' => $unity])->OrderBy('id', 'desc')->first();
            return $cashier;
        }
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
            $request['code'] = Str::uuid();
            $request['unity'] = auth()->user()->unity[0]['unity'];
            $request['user'] = auth()->user()->id;
            $request['value'] = ($request['value']) ? str_replace(',', '.', $request->value) : null;

            $cashier = UnityCashier::where(['unity' => $request['unity']])->OrderBy('id', 'desc')->first();
            if ($cashier) {
                if ($cashier->status === 'ABERTO' && $request['action'] == 'ABERTURA') {
                    return response()->json(['erro' => true, 'message' => 'O Caixa já se encontra aberto!'], 500);
                }
                if ($cashier->status === 'FECHADO' && $request['action'] != 'ABERTURA') {
                    return response()->json(['erro' => true, 'message' => 'Para executar esta operação é nescessário que o Caixa esteja aberto!'], 500);
                }
            }

            if ($request['operation'] == 'ENTRADA') {
                $request['amount'] = ($cashier) ? ($cashier->amount + $request['value']) : $request['value'];
            } else {
                if ($request['value'] > $cashier->amount) {
                    return response()->json(['erro' => true, 'message' => 'Sem saldo em Caixa para executar esta operação!'], 500);
                }
                $request['amount'] = ($cashier) ? ($cashier->amount - $request['value']) : $request['value'];
            }

            $request['status'] = ($request['action'] === 'FECHAMENTO') ? 'FECHADO' : 'ABERTO';
            UnityCashier::create($request->all());
            return $this->index();
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
