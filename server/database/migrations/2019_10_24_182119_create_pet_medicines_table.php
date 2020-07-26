<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePetMedicinesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pet_medicines', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('pet')->nullable();
            $table->foreign('pet')->references('id')->on('pets');
            $table->string('description');
            $table->date('date')->nullable();
            $table->integer('validity')->nullable();
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
        Schema::dropIfExists('pet_medicines');
    }
}
