<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('unit')->nullable();
            $table->foreign('unit')->references('id')->on('unities');
            $table->string('description')->nullable();
            $table->string('ean')->nullable();
            $table->string('sku')->nullable();
            $table->string('origin')->nullable();
            $table->integer('type')->nullable();
            $table->string('ncm')->nullable();
            $table->string('cfop')->nullable();
            $table->string('cest')->nullable();
            $table->decimal('price_sale', 10, 2)->nullable();
            $table->enum('unity', ['UN', 'KG'])->nullable();
            $table->float('quantity_stock')->nullable();
            $table->string('net_weight')->nullable();
            $table->string('gross_weight')->nullable();
            $table->integer('type_pack')->nullable();
            $table->string('width')->nullable();
            $table->string('heigth')->nullable();
            $table->string('length')->nullable();
            $table->text('description_comp')->nullable();
            $table->string('image')->nullable();
            $table->bigInteger('category')->nullable();
            $table->foreign('category')->references('id')->on('product_categories');
            $table->integer('brand')->nullable();
            $table->integer('manufacturer')->nullable();
            $table->bigInteger('provider')->nullable();
            $table->foreign('provider')->references('id')->on('product_providers');
            $table->string('cod_product')->nullable();
            $table->string('unit_per_box')->nullable();
            $table->decimal('price_cost', 10 , 2)->nullable();
            $table->integer('line_product')->nullable();
            $table->string('guarantee')->nullable();
            $table->integer('situation')->nullable();
            $table->string('gtin')->nullable();
            $table->string('unit_tributary')->nullable();
            $table->string('conversion')->nullable();
            $table->string('ipi')->nullable();
            $table->decimal('value_ipi', 10, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
