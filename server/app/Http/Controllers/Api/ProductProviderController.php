<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use App\Models\ProductProvider;
use App\Models\User;
use Illuminate\Http\Request;

class ProductProviderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $productProviders = ProductProvider::where(['unity' => auth()->user()->unity[0]['unity']])->get();
            return $productProviders;
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
        if (isset(auth()->user()->unity[0]['unity'])) {
            $request['unity'] = auth()->user()->unity[0]['unity'];
            $productProvider = ProductProvider::create($request->all());
            return $productProvider;
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
        if (isset(auth()->user()->unity[0]['unity'])) {
            $productProviders = ProductProvider::where(['unity' => auth()->user()->unity[0]['unity'], 'type' => $id])->get();
            return $productProviders;
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
        $productProvider = ProductProvider::findOrFail($id);
        $productProvider->update($request->all());

        return $productProvider;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $productProvider = ProductProvider::findOrFail($id);
        $productProvider->delete();
        return $productProvider;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function products_providers_csv_import(Request $request)
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

            // $pd == pets data
            $pd = [];

            //declaração de campos na tabela
            if ($al && $currentLine > 0 && count($al) > 2) {

                try {

                    $pd['cod_erp'] = $al[0];

                    $pd['description'] = trim(str_replace('"', "", $this->utf8Fix($al[2]))) . " - " . trim(str_replace('"', "", $this->utf8Fix($al[1])));
                    $pd['status'] = 1;

                    $pd['unity'] = auth()->user()->unity[0]['unity'];

                    ProductProvider::create($pd);

                } catch (Exception $e) {
                    return response()->json(["status" => "error", "message" => $e->getMessage()], 400);
                }

            }
            $currentLine++;
        }
        return $this->index();
    }

    private function utf8Fix($msg)
    {
        $accents = array("á", "à", "â", "ã", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "ô", "õ", "ö", "ú", "ù", "û", "ü", "ç", "Á", "À", "Â", "Ã", "Ä", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ó", "Ò", "Ô", "Õ", "Ö", "Ú", "Ù", "Û", "Ü", "Ç");
        $utf8 = array("Ã¡", "Ã ", "Ã¢", "Ã£", "Ã¤", "Ã©", "Ã¨", "Ãª", "Ã«", "Ã­", "Ã¬", "Ã®", "Ã¯", "Ã³", "Ã²", "Ã´", "Ãµ", "Ã¶", "Ãº", "Ã¹", "Ã»", "Ã¼", "Ã§", "Ã", "Ã€", "Ã‚", "Ãƒ", "Ã„", "Ã‰", "Ãˆ", "ÃŠ", "Ã‹", "Ã", "ÃŒ", "ÃŽ", "Ã", "Ã“", "Ã’", "Ã”", "Ã•", "Ã–", "Ãš", "Ã™", "Ã›", "Ãœ", "Ã‡");
        $fix = str_replace($utf8, $accents, $msg);
        return $fix;
    }
}
