<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePetsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pets', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->integer('user')->nullable();
            $table->foreign('user')->references('id')->on('users');
            $table->string('avatar')->nullable();
            $table->string('name')->nullable();
            $table->integer('type')->nullable();
            $table->foreign('type')->references('id')->on('pet_types');
            $table->integer('breed')->nullable();
            $table->foreign('breed')->references('id')->on('pet_breeds');
            $table->string('gender', 6)->nullable();
            $table->integer('size')->nullable();
            $table->foreign('size')->references('id')->on('pet_sizes');
            $table->integer('type_fur')->nullable();
            $table->foreign('type_fur')->references('id')->on('pet_type_furs');
            $table->date('date_birth')->nullable();
            $table->boolean('castrated')->nullable();
            $table->string('ration_brand')->nullable();
            $table->integer('times_day')->nullable();
            $table->integer('amount_time')->nullable();
            $table->string('types_food')->nullable();
            $table->text('obs_food')->nullable();
            $table->boolean('sachet')->nullable();
            $table->boolean('perfume')->nullable();
            $table->boolean('ornament')->nullable();
            $table->boolean('alive')->nullable();
            $table->boolean('pool')->nullable();
            $table->text('obs_general')->nullable();
            $table->string('vet_name')->nullable();
            $table->string('vet_phone')->nullable();
            $table->text('obs_medical')->nullable();
            $table->string('vaccination_carter')->nullable();
            $table->string('case_emergency')->nullable();
            $table->string('case_symptoms')->nullable();
            $table->date('date_cio')->nullable();
            $table->date('date_evaluation')->nullable();
            $table->integer('behavior')->nullable();
            $table->foreign('behavior')->references('id')->on('pet_behaviors');
            $table->boolean('has_services')->nullable();
            $table->boolean('special_attention')->nullable();
            $table->boolean('attention')->nullable();
            $table->text('obs_alert')->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('pets');
    }
}
