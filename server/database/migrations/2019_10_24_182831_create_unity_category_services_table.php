<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityCategoryServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_category_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('service')->nullable();
            $table->foreign('service')->references('id')->on('unity_services');
            $table->bigInteger('category')->nullable();
            $table->foreign('category')->references('id')->on('unity_categories');
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
        Schema::dropIfExists('unity_category_services');
    }
}
