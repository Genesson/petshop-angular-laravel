<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductCategory;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $productCategorys = ProductCategory::where(['unity' => auth()->user()->unity[0]['unity']])->get();
            return $productCategorys;
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
            $productCategory = ProductCategory::create($request->all());
            return $productCategory;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if (isset(auth()->user()->unity[0]['unity'])) {
            $productCategorys = ProductCategory::where(['unity' => auth()->user()->unity[0]['unity'], 'type' => $id])->get();
            return $productCategorys;
        }
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
        $productCategory = ProductCategory::findOrFail($id);
        $productCategory->update($request->all());
        return $productCategory;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $productCategory = ProductCategory::findOrFail($id);
        $productCategory->delete();
        return $productCategory;
    }
}
