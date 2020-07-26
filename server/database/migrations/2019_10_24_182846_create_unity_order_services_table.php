<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityOrderServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_order_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('order')->nullable();
            $table->foreign('order')->references('id')->on('unity_orders');
            $table->integer('service')->nullable();
            $table->foreign('service')->references('id')->on('unity_services');
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
        Schema::dropIfExists('unity_order_services');
    }
}
