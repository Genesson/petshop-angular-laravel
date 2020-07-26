<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityOrderProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_order_products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('order')->nullable();
            $table->foreign('order')->references('id')->on('unity_orders');
            $table->integer('product')->nullable();
            $table->foreign('product')->references('id')->on('products');
            $table->integer('quantity')->nullable();
            $table->decimal('amount', 10 , 2)->nullable();
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
        Schema::dropIfExists('unity_order_products');
    }
}
