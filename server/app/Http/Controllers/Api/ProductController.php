<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pet;
use App\Models\PetTypeFur;
use App\Models\ProductProvider;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $products = Product::where('unit', auth()->user()->unity[0]['unity'])->get();
            foreach ($products as $product) {
                $product->category = ($product->category()->first()) ? $product->category()->first() : [];
                $product->provider = ($product->provider()->first()) ? $product->provider()->first() : [];
            }
            return $products;
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
        $request['unit'] = auth()->user()->unity[0]['unity'];
        $request['price_sale'] = ($request['price_sale']) ? str_replace(',', '.', $request->price_sale) : null;
        $request['price_cost'] = ($request['price_cost']) ? str_replace(',', '.', $request->price_cost) : null;
        $request['value_ipi'] = ($request['value_ipi']) ? str_replace(',', '.', $request->value_ipi) : null;
        $request['category'] = $request->category['id'];
        $request['provider'] = $request->provider['id'];
        $product = Product::create($request->all());
        $product->category = ($product->category()->first()) ? $product->category()->first() : [];
        $product->provider = ($product->provider()->first()) ? $product->provider()->first() : [];
        return $product;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Product::findOrFail($id);
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
        $request['price_sale'] = ($request['price_sale']) ? str_replace(',', '.', $request->price_sale) : null;
        $request['price_cost'] = ($request['price_cost']) ? str_replace(',', '.', $request->price_cost) : null;
        $request['value_ipi'] = ($request['value_ipi']) ? str_replace(',', '.', $request->value_ipi) : null;
        $request['category'] = $request->category['id'];
        $request['provider'] = $request->provider['id'];
        $product = Product::findOrFail($id);
        $product->update($request->all());
        $product->category = ($product->category()->first()) ? $product->category()->first() : [];
        $product->provider = ($product->provider()->first()) ? $product->provider()->first() : [];
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return $product;
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function products_csv_import(Request $request)
    {
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

            // $pd == products data
            $pd = [];

            //declaração de campos na tabela
            if ($al && $currentLine > 0 && count($al) > 2) {

                try {

                    $pd['cod_erp'] = trim(str_replace('"', "", $al[0]));

                    $toReturn = $pd['cod_erp'];

                    $pd['unit'] = auth()->user()->unity[0]['unity'];

                    $pd['description'] = trim(str_replace('"', "", $this->utf8Fix($al[1])));
                    $pd['ean'] = trim(str_replace('"', "", $al[3]));

                    $pd['type'] = 1; //Only exists one type.

                    $pd['ncm'] = trim(str_replace('"', "", $al[20]));
                    $pd['cfop'] = trim(str_replace('"', "", $al[22]));
                    $pd['cest'] = trim(str_replace('"', "", $al[21]));

                    $pd['price_sale'] = trim(str_replace('"', "", $al[18]));
                    $pd['price_sale'] = str_replace(',', ".", $pd['price_sale']);

                    $pd['unity'] = trim(str_replace('"', "", $al[5])) > 0 ? 'KG' : 'UN';

                    $pd['quantity_stock'] = trim(str_replace('"', "", $al[16]));
                    $pd['quantity_stock'] = str_replace(',', ".", $pd['quantity_stock']);

                    if ($this->utf8Fix(mb_strtolower(trim(str_replace('"', "", $al[9])))) == 'caixa')
                        $pd['type_pack'] = 1;
                    else if ($this->utf8Fix(mb_strtolower(trim(str_replace('"', "", $al[9])))) == 'pacote')
                        $pd['type_pack'] = 2;

                    $pd['description_comp'] = trim(str_replace('"', "", $this->utf8Fix($al[2])));

//        $pd['brand'] = // It's should be fabricante on the Spreadsheet?
//        $pd['manufacturer'] =
//        $pd['provider'] =
                    $pd['cod_product'] = $al[4] != null ? trim(str_replace('"', "", $al[4])) : ($al[3] != null ? trim(str_replace('"', "", $al[3])) : $pd['cod_erp']);
//                        $pd['unit_per_box'] = // It's not exists in Spreadsheet
                    $pd['price_cost'] = trim(str_replace('"', "", $al[17]));
                    $pd['price_cost'] = str_replace(',', ".", $pd['price_cost']);
//                        $pd['line_product'] = // It's not exists in Spreadsheet
//                        $pd['guarantee'] = // It's not exists in Spreadsheet
                    $pd['situation'] = $al[7] != null && trim(str_replace('"', "", $al[7])) == 1 ? 1 : 2;
                    $pd['gtin'] = $pd['ean']; // I'ts same ean
                    $pd['unit_tributary'] = 99; // Must be inserted by xml importing
//                        $pd['origin'] = // It's not exists in Spreadsheet
                    $pd['conversion'] = trim(str_replace('"', "", $al[14]));
//        'ipi',
//        'value_ipi'

                    Product::create($pd);

                } catch (Exception $e) {
                    return response()->json(["status" => "error", "message" => $toReturn . " " . $e->getMessage()], 400);
                }
            }
            $currentLine++;
        }
        return $this->index();
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse|\Illuminate\Http\Response
     */
    public function products_products_providers_csv_import(Request $request)
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
//            if (strlen($line) > 30) {

            // $al == array line
            $al = explode(';', $line);

            //declaração de campos na tabela
            if ($al && $currentLine > 0 && count($al) > 2) {

                if (((int)trim(str_replace('"', "", $al[2]))) > 0) // If principal provider
                    try {

                        $toReturn = $al[0];

                        // $pd == products data
                        $pd = [];

                        $pd['provider'] = $this->getProductProviderByERPCode((int)trim(str_replace('"', "", $al[1])))->id ?? null;

                        if ($pd['provider'] != null) { // if has Provider

                            $product = $this->getProductByERPCode((int)trim(str_replace('"', "", $al[0])));

                            if ($product != null) {// if Product is different of null

                                $product->fill($pd);

                                $product->save();

                            }

                        }

                    } catch (Exception $e) {
                        return response()->json(["status" => "error", "message" => $toReturn . " " . $e->getMessage()], 400);
                    }
            }
            $currentLine++;
        }
//        }
        return $this->index();
    }

    /**
     * Return Product by erpCode
     * @param $erpCode
     * @return Product
     */
    private function getProductByERPCode(int $erpCode)
    {
        return Product::where(['cod_erp' => $erpCode])->first();
    }

    /**
     * Return Provider by erpCode
     * @param $erpCode
     * @return ProductProvider
     */
    private function getProductProviderByERPCode(int $erpCode)
    {
        return ProductProvider::where(['cod_erp' => $erpCode])->first();
    }

    /**
     * @param $msg
     * @return string|string[]
     *
     */
    private function utf8Fix($msg)
    {
        $accents = array("á", "à", "â", "ã", "ä", "é", "è", "ê", "ë", "í", "ì", "î", "ï", "ó", "ò", "ô", "õ", "ö", "ú", "ù", "û", "ü", "ç", "Á", "À", "Â", "Ã", "Ä", "É", "È", "Ê", "Ë", "Í", "Ì", "Î", "Ï", "Ó", "Ò", "Ô", "Õ", "Ö", "Ú", "Ù", "Û", "Ü", "Ç");
        $utf8 = array("Ã¡", "Ã ", "Ã¢", "Ã£", "Ã¤", "Ã©", "Ã¨", "Ãª", "Ã«", "Ã­", "Ã¬", "Ã®", "Ã¯", "Ã³", "Ã²", "Ã´", "Ãµ", "Ã¶", "Ãº", "Ã¹", "Ã»", "Ã¼", "Ã§", "Ã", "Ã€", "Ã‚", "Ãƒ", "Ã„", "Ã‰", "Ãˆ", "ÃŠ", "Ã‹", "Ã", "ÃŒ", "ÃŽ", "Ã", "Ã“", "Ã’", "Ã”", "Ã•", "Ã–", "Ãš", "Ã™", "Ã›", "Ãœ", "Ã‡");
        $fix = str_replace($utf8, $accents, $msg);
        return $fix;
    }
}
