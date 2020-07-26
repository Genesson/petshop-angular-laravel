<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Dre;
use App\Models\UnityReceivable;
use Carbon\Carbon;
use DB;

use Exception;

class DreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            return Dre::where('unity', auth()->user()->unity[0]['unity'])->get();
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $request['unity'] = auth()->user()->unity[0]['unity'];
            $dre = Dre::create($request->all());
            return $dre;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($date)
    {
        $dateArray = (explode('-', $date));
        $dre = Dre::where('unity', auth()->user()->unity[0]['unity'])
            ->whereMonth('data_exercicio', $dateArray[1])
            ->whereYear('data_exercicio', $dateArray[2])->first();

        if (!$dre) {
            $data = [
                'unity' => auth()->user()->unity[0]['unity'],
                'receita_bruta_vendas' => 0,
                'impostos_sem_vendas' => 0,
                'receita_liquida_vendas' => 0,
                'custos_produtos_vendidos' => 0,
                'lucro_bruto' => 0,
                'despesas_vendas' => 0,
                'despesas_gerais_administrativas' => 0,
                'impostos_taxas' => 0,
                'despesas_depreciacoes_amortizacoes' => 0,
                'equivalencia_patrimonial' => 0,
                'outras_receitas' => 0,
                'receitas_financeiras' => 0,
                'despesas_financeiras' => 0,
                'lucro_operacional' => 0,
                'receitas_nao_operacionais' => 0,
                'lucro_liquido' => 0,
                'data_exercicio' => Carbon::parse($date)
            ];
            $dre = Dre::create($data);
        }

        return $dre;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $dre = Dre::findOrFail($id);
        switch ($request->module) {
            case 'RECEITA_BRUTA_VENDAS':
                $dre->update(['receita_bruta_vendas' => $this->format($request->value)]);
                break;
            case 'IMPOSTOS_SEM_VENDAS':
                $dre->update(['impostos_sem_vendas' => $this->format($request->value)]);
                break;
            case 'RECEITA_LIQUIDA_VENDAS':
                $dre->update(['receita_liquida_vendas' => $this->format($request->value)]);
                break;
            case 'CUSTOS_PRODUTOS_VENDIDOS':
                $dre->update(['custos_produtos_vendidos' => $this->format($request->value)]);
                break;
            case 'LUCRO_BRUTO':
                $dre->update(['lucro_bruto' => $this->format($request->value)]);
                break;
            case 'DESPESAS_VENDAS':
                $dre->update(['despesas_vendas' => $this->format($request->value)]);
                break;
            case 'DESPESAS_GERAIS_ADMINISTRATIVAS':
                $dre->update(['despesas_gerais_administrativas' => $this->format($request->value)]);
                break;
            case 'IMPOSTOS_TAXAS':
                $dre->update(['impostos_taxas' => $this->format($request->value)]);
                break;
            case 'DESPESAS_DEPRECIACOES_AMORTIZACOES':
                $dre->update(['despesas_depreciacoes_amortizacoes' => $this->format($request->value)]);
                break;
            case 'EQUIVALENCIA_PATRIMONIAL':
                $dre->update(['equivalencia_patrimonial' => $this->format($request->value)]);
                break;
            case 'OUTRAS_RECEITAS':
                $dre->update(['outras_receitas' => $this->format($request->value)]);
                break;
            case 'RECEITAS_FINANCEIRAS':
                $dre->update(['receitas_financeiras' => $this->format($request->value)]);
                break;
            case 'DESPESAS_FINANCEIRAS':
                $dre->update(['despesas_financeiras' => $this->format($request->value)]);
                break;
            case 'LUCRO_OPERACIONAL':
                $dre->update(['lucro_operacional' => $this->format($request->value)]);
                break;
            case 'RECEITAS_NAO_OPERACIONAIS':
                $dre->update(['receitas_nao_operacionais' => $this->format($request->value)]);
                break;
            case 'LUCRO_LIQUIDO':
                $dre->update(['lucro_liquido' => $this->format($request->value)]);
                break;
        }
        return $this->updateValues($id);
        return $this->show(Carbon::now()->isoFormat("DD-MM-YYYY"));
    }

    public function format($value)
    {
        return number_format(str_replace(",", ".", str_replace(".", "", $value)), 2, '.', '');
    }

    public function updateValues($id)
    {
        $dre = Dre::findOrFail($id);
        $date = (explode('-', $dre->data_exercicio));

        // RECEITA_BRUTA_VENDAS
        $received = UnityReceivable::where('unity', auth()->user()->unity[0]['unity'])
            ->select(DB::raw('sum( value ) as total'))
            ->whereMonth('receivement_at', $date[1])
            ->whereYear('receivement_at', $date[0])
            ->whereNotNull('receivement_at')->first();
        $dre->update(['receita_bruta_vendas' => $received->total]);
        // FECHA RECEITA_BRUTA_VENDAS

        // RECEITA_LIQUIDA_VENDAS
        $receita_liquida_vendas = $dre->receita_bruta_vendas - $dre->impostos_sem_vendas;
        $dre->update(['receita_liquida_vendas' => $receita_liquida_vendas]);
        // FECHA RECEITA_LIQUIDA_VENDAS

        // LUCRO_BRUTO
        $lucro_bruto = $dre->receita_liquida_vendas - $dre->custos_produtos_vendidos;
        $dre->update(['lucro_bruto' => $lucro_bruto]);
        // FECHA LUCRO_BRUTO

        // LUCRO_OPERACIONAL
        $receita = $dre->equivalencia_patrimonial + $dre->outras_receitas + $dre->receitas_financeiras;
        $despesa = $dre->despesas_vendas + $dre->despesas_gerais_administrativas + $dre->impostos_taxas + $dre->despesas_depreciacoes_amortizacoes + $dre->despesas_financeiras;
        $lucro_operacional = $receita - $despesa;
        $dre->update(['lucro_operacional' => $dre->lucro_bruto + $lucro_operacional]);
        // FECHA LUCRO_OPERACIONAL

        // LUCRO_LIQUIDO
        $lucro_liquido = $dre->lucro_operacional + $dre->receitas_nao_operacionais;
        $dre->update(['lucro_liquido' => $lucro_liquido]);
        // FECHA LUCRO_LIQUIDO
    }

    public function pdfDre($date)
    {
        try {
            $date = (explode('-', $date));
            $dre = Dre::where('unity', auth()->user()->unity[0]['unity'])
                ->whereMonth('data_exercicio', $date[1])
                ->whereYear('data_exercicio', $date[2])
                ->first();
            $name_file = $dre->id . '-' . $dre->data_exercicio . '.pdf';

            $dre->data_exercicio = Carbon::parse($dre->data_exercicio)->format('m/Y');
            $pdf = \PDF::loadView('pdf', compact('dre'));
            \Storage::put('public/pdf/' . $name_file, $pdf->setPaper('a4')->output());

            $path = url("/storage/pdf/") . '/' . $name_file;
            // return $pdf->setPaper('a4')->stream('dre.pdf');
            return response()->json($path);
        } catch (Exception $error) {
            return response()->json(['error' => $error->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $dre = Dre::findOrFail($id);
        $dre->delete();
        return $dre;
    }
}
