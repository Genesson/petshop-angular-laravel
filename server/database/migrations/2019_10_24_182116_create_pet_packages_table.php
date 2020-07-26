<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePetPackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pet_packages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('pet')->nullable();
            $table->foreign('pet')->references('id')->on('pets');
            $table->integer('service')->nullable();
            $table->foreign('service')->references('id')->on('unity_services');
            $table->integer('quantity_days')->nullable();
            $table->integer('interval_days')->nullable();
            $table->boolean('weekdays')->nullable();
            $table->boolean('with_month')->nullable();
            $table->date('start_date')->nullable();
            $table->string('week_days')->nullable();
            $table->string('intervals')->nullable();
            $table->boolean('transport')->nullable();
            $table->integer('transport_id')->nullable();
            $table->boolean('status')->nullable();
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
        Schema::dropIfExists('pet_packages');
    }
}
