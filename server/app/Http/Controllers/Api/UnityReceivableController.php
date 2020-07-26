<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\UnityCashier;
use App\Models\UnityOrder;
use App\Models\UnityReceivable;
use App\Models\UnityService;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UnityReceivableController extends Controller
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

    public function productsName($productsOrder)
    {
        $productsName = '';
        foreach ($productsOrder as $productOrder) {
            $product = Product::where('id', $productOrder->product)->first();
            $productsName .= $product->description . ', ';
        }
        return substr(trim($productsName), 0, -1);
    }

    public function servicesName($servicesOrder)
    {
        $servicesName = '';
        foreach ($servicesOrder as $serviceOrder) {
            $service = UnityService::where('id', $serviceOrder->service)->first();
            $service = UnityService::where('id', $service->service)->first();
            $servicesName .= $service->description . ', ';
        }
        return substr(trim($servicesName), 0, -1);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($receive)
    {
        $receivables = ($receive === 'RECEIVED') ?
            UnityReceivable::where('unity', auth()->user()->unity[0]['unity'])->whereNotNull('receivement_at')->get() :
            UnityReceivable::where('unity', auth()->user()->unity[0]['unity'])->whereNull('receivement_at')->get();
        foreach ($receivables as $receivable) {
            $receivable['order'] = ($receivable->order()->first()) ? $receivable->order()->first() : [];
            $receivable['flag'] = ($receivable->flag()->first()) ? $receivable->flag()->first() : [];
            $receivable['pet'] = ($receivable['order']->pet()->first()) ? $receivable['order']->pet()->first() : [];
            $receivable['tutor'] = ($receivable['pet']->tutor()->first()) ? $receivable['pet']->tutor()->first() : [];

            $user = User::where('id', $receivable['order']->user)->first();
            $order = UnityOrder::where('id', $receivable['order']->id)->first();
            $receivable['user'] = ($user) ? $user : [];
            $products = ($order->products()->get()) ? $order->products()->get() : [];
            $services = ($order->services()->get()) ? $order->services()->get() : [];
            $receivable['productsName'] = ($order->products()->get()) ? $this->productsName($products) : '';
            $receivable['servicesName'] = ($order->services()->get()) ? $this->servicesName($services) : '';
        }
        return $receivables;
    }

    public function totals()
    {
        $received = UnityReceivable::where('unity', auth()->user()->unity[0]['unity'])
            ->select(DB::raw('sum( value ) as total'))
            ->whereNotNull('receivement_at')->first();
        $receivable = UnityReceivable::where('unity', auth()->user()->unity[0]['unity'])
            ->select(DB::raw('sum( value ) as total'))
            ->whereNull('receivement_at')->first();
        $receivableToday = UnityReceivable::where('unity', auth()->user()->unity[0]['unity'])
            ->select(DB::raw('sum( value ) as total'))
            ->where('expiration', Carbon::today())
            ->whereNull('receivement_at')->first();
        $received->total = ($received->total) ? $received->total : '0';
        $receivable->total = ($receivable->total) ? $receivable->total : '0';
        $cashier = UnityCashier::where(['unity' => auth()->user()->unity[0]['unity']])->OrderBy('id', 'desc')->first();
        $receivableToday->total = ($receivableToday->total && ($cashier->status !== 'FECHADO')) ? $receivableToday->total : '0';

        return ['received' => $received->total, 'receivableToday' => $receivableToday->total, 'receivable' => $receivable->total];
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
        if (auth()->user()) {
            $request['unity'] = auth()->user()->unity[0]['unity'];
            $cashier = UnityCashier::where(['unity' => $request['unity']])->OrderBy('id', 'desc')->first();
            if ($cashier->status !== 'FECHADO') {
                $this->updateCashier($request['value']);
                $unityReceivable = UnityReceivable::where(['id' => $id])->first();
                UnityReceivable::where(['id' => $id])->update(['payment_with' => $request['payment_with'], 'receivement_at' => Carbon::now()]);
                if ($unityReceivable->last === 1) {
                    UnityOrder::where(['id' => $unityReceivable->order])->update(['receivement_at' => Carbon::now()]);
                }
                return $unityReceivable;
            } else {
                return response()->json(['erro' => true, 'message' => 'O Caixa se encontra fechado!'], 500);
            }
        }
    }

    public function updateCashier($value)
    {
        if (auth()->user()) {
            $user = auth()->user()->id;
            $unity = auth()->user()->unity[0]['unity'];
            $value = str_replace(',', '.', $value);

            $cashier = UnityCashier::where(['unity' => $unity])->OrderBy('id', 'desc')->first();
            $dataCashier = [
                'unity' => $unity,
                'user' => $user,
                'value' => $value,
                'amount' => $cashier->amount + $value,
                'operation' => 'ENTRADA',
                'action' => 'PARCELA',
                'status' => 'ABERTO',
            ];
            UnityCashier::create($dataCashier);
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
        //
    }
}
