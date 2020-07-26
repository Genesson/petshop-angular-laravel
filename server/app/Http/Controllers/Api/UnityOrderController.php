<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use App\Models\PetPackage;
use App\Models\Product;
use App\Models\Schedule;
use App\Models\UnityOrderService;
use App\Models\UnityReceivable;
use App\Models\UnityService;
use Carbon\Carbon;
use Illuminate\Http\Request;

use App\Models\UnityOrder;
use App\Models\UnityOrderProduct;

class UnityOrderController extends Controller
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
        $order = UnityOrder::where(['user' => auth()->user()->id, 'status' => 'Aberta'])->first();
        if ($order && $order->pet !== $request['pet']['id']) {
            // VERIFICA SE CARRINHO ESTÁ VAZIO
            $countService = UnityOrderService::where('order', $order->id)->count();
            $countProduct = UnityOrderProduct::where('order', $order->id)->count();

            if (($countService + $countProduct) == 0) {
                UnityOrder::where('id', $order->id)->delete();
            } else {
                if (isset($request['item']['service'])) {
                    $lastSchedule = Schedule::where(['service' => $request['item']['service'], 'pet' => $request['pet']['id']])->OrderBy('id', 'desc')->first();
                    $lastSchedule->delete();
                    return response()->json(['erro' => true, 'message' => 'Existe uma ordem de outro cliente em aberto, serviço não agendado!'], 500);
                }
                return response()->json(['erro' => true, 'message' => 'Existe uma ordem de outro cliente em aberto!'], 500);
            }
        }

        $order = UnityOrder::where(['user' => auth()->user()->id, 'status' => 'Aberta'])->first();
        if (!$order) {
            $data_order = [
                'unity' => auth()->user()->unity[0]['unity'],
                'user' => auth()->user()->id,
                'pet' => $request['pet']['id'],
                'status' => 'Aberta'
            ];
            $order = UnityOrder::create($data_order);
        }

        if ($order && $request['schedule']) {
            UnityOrder::where('id', $order->id)->update(['schedule' => $request['schedule']]);
        }

        if (isset($request['item']['service'])) {
            $order_service = UnityOrderService::where(['order' => $order->id, 'service' => $request['item']['id']])->first();
            if ($order_service) {
                $quantity = $order_service->quantity + $request['quantity'];
                $amount = $request['item']['price'] * $quantity;
                UnityOrderService::where(['id' => $order_service->id])->update([
                    'quantity' => $quantity,
                    'amount' => ($request['item']['total'] > 0) ? $request['item']['total'] : $amount
                ]);
            } else {
                $quantity = $request['quantity'];
                $amount = $request['item']['price'];
                UnityOrderService::create([
                    'order' => $order->id,
                    'service' => $request['item']['id'],
                    'quantity' => $quantity,
                    'amount' => (isset($request['item']['total']) && $request['item']['total'] > 0) ? $request['item']['total'] : $amount
                ]);
            }

            // Adiciona Serviço de Transporte
            $schedule = Schedule::where('package', $request['schedule'])->first();
            if ($schedule) {
                $package = PetPackage::where('id', $schedule->package)->first();
                if ($package && $package->transport == 1) {
                    $service = UnityService::where('id', $package->transport_id)->first();

                    UnityOrderService::create([
                        'order' => $order->id,
                        'service' => $service->id,
                        'quantity' => $request['quantity'],
                        'amount' => $service->price * $request['quantity']
                    ]);
                }
            } else {
                $schedule = Schedule::where('id', $request['schedule'])->first();
                if ($schedule && $schedule->transport == 1) {
                    $service = UnityService::where('id', $schedule->transport_id)->first();

                    UnityOrderService::create([
                        'order' => $order->id,
                        'service' => $service->id,
                        'quantity' => $request['quantity'],
                        'amount' => $service->price * $request['quantity']
                    ]);
                }
            }
        } else {
            $order_product = UnityOrderProduct::where(['order' => $order->id, 'product' => $request['item']['id']])->first();
            if ($order_product) {
                $quantity = $order_product->quantity + $request['quantity'];
                $amount = $request['item']['price_sale'] * $quantity;
                UnityOrderProduct::where(['id' => $order_product->id])->update([
                    'quantity' => $quantity,
                    'amount' => $amount
                ]);
            } else {
                $quantity = $request['quantity'];
                $amount = $request['item']['price_sale'];
                UnityOrderProduct::create([
                    'order' => $order->id,
                    'product' => $request['item']['id'],
                    'quantity' => $quantity,
                    'amount' => $amount
                ]);
                // Atualiza quantidade em estoque
                $product = Product::select('quantity_stock')->where('id', $request['item']['id'])->first();
                Product::where('id', $request['item']['id'])->update(
                    ['quantity_stock' => ($product->quantity_stock - $quantity)]
                );
            }
        }

        return $this->show(auth()->user()->id);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $this->updateAmountOrder();
        $order = UnityOrder::where(['user' => $id, 'status' => 'Aberta'])->first();
        if ($order) {
            $pet = Pet::where('id', $order->pet)->first();
            if (!$pet) {
                UnityOrder::where(['user' => $id, 'status' => 'Aberta'])->delete();
            }

            $order->products = ($order->products()->get()) ? $order->products()->get() : [];
            foreach ($order->products as $product) {
                $product->product = ($product->product()->first()) ? $product->product()->first() : [];
            }
            $order->services = ($order->services()->get()) ? $order->services()->get() : [];
            foreach ($order->services as $service) {
                $service->service = ($service->service()->first()) ? $service->service()->first() : [];
                $unityService = UnityService::where(['id' => $service->service['service']])->first();
                $service->service['description'] = $unityService->description;
            }
            $order->pet = ($order->pet()->first()) ? $order->pet()->first() : [];
            $order->tutor = ($order->pet->tutor()->first()) ? $order->pet->tutor()->first() : [];
            return $order;
        }
        return [];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $quantity)
    {
        $order = UnityOrder::where(['user' => auth()->user()->id, 'status' => 'Aberta'])->first();
        if ($quantity <= 0) {
            UnityOrderProduct::where(['order' => $order->id, 'product' => $request->id])->delete();
        } else {
            $order_product = UnityOrderProduct::where(['order' => $order->id, 'product' => $request->id])->first();
            $amount = $request->price_sale * $quantity;
            UnityOrderProduct::where(['id' => $order_product->id])->update([
                'quantity' => $quantity,
                'amount' => $amount
            ]);
        }
        return $this->show(auth()->user()->id);
    }

    public function updateDiscount(Request $request)
    {
        $order = UnityOrder::where(['user' => auth()->user()->id, 'status' => 'Aberta'])->first();
        UnityOrder::where(['id' => $order->id])->update(['discount' => $request->discount]);
        return $this->show(auth()->user()->id);
    }

    public function updateAmountOrder()
    {
        $order = UnityOrder::where(['user' => auth()->user()->id, 'status' => 'Aberta'])->first();
        if ($order) {
            $amount = 0;
            $order_products = UnityOrderProduct::where(['order' => $order->id])->get();
            foreach ($order_products as $order_product) {
                $amount += $order_product->amount;
            }
            $order_services = UnityOrderService::where(['order' => $order->id])->get();
            foreach ($order_services as $order_service) {
                $amount += $order_service->amount;
            }
            UnityOrder::where(['id' => $order->id])->update(['amount' => $amount]);
        }
    }

    public function createReceivables(Request $request)
    {
        $quotas = count($request->receivables);
        $i = 1;
        foreach ($request->receivables as $receivable) {
            $data_receivable = [
                'unity' => auth()->user()->unity[0]['unity'],
                'order' => $request->order,
                'quota' => $receivable['quota'],
                'value' => $receivable['value'],
                'payment_with' => $request->payment_with,
                'flag' => $request->flag,
                'voucher_number' => $request->voucher_number,
                'cpf' => $request->cpf,
                'cpf_number' => $request->cpf_number,
                'expiration' => Carbon::createFromFormat('d/m/Y', $receivable['expiration'])->format('Y-m-d'),
                'last' => ($quotas === $i)
            ];
            UnityReceivable::create($data_receivable);
            $i++;
        }
        UnityOrder::where(['id' => $request->order])->update(['status' => 'Fechada']);
        $order = UnityOrder::where(['id' => $request->order])->first();
        return $order;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $order = UnityOrder::where(['user' => auth()->user()->id, 'status' => 'Aberta'])->first();
        if ($request->service) {
            UnityOrderService::where(['order' => $order->id, 'service' => $request->id])->delete();
        } else {
            UnityOrderProduct::where(['order' => $order->id, 'product' => $request->id])->delete();
        }
        return $this->show(auth()->user()->id);
    }
}
