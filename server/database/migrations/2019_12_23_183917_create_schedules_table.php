<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSchedulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('schedules', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->bigInteger('user')->nullable();
            $table->foreign('user')->references('id')->on('users');
            $table->bigInteger('pet')->nullable();
            $table->foreign('pet')->references('id')->on('pets');
            $table->integer('service')->nullable();
            $table->foreign('service')->references('id')->on('unity_services');
            $table->integer('category')->nullable();
            $table->foreign('category')->references('id')->on('unity_categories');
            $table->integer('room')->nullable();
            $table->foreign('room')->references('id')->on('unity_rooms');
            $table->integer('package')->nullable();
            $table->foreign('package')->references('id')->on('pet_packages');
            $table->date('date')->nullable();
            $table->time('hour')->nullable();
            $table->enum('taxi', ['SIM', 'NAO'])->nullable();
            $table->float('time')->nullable();
            $table->date('date_checkin')->nullable();
            $table->time('hour_checkin')->nullable();
            $table->date('date_checkout')->nullable();
            $table->time('hour_checkout')->nullable();
            $table->float('daily')->nullable();
            $table->enum('period', ['MEIA', 'INTEIRA', 'PERNOITE'])->nullable();
            $table->integer('custom')->nullable();
            $table->boolean('transport')->nullable();
            $table->integer('transport_id')->nullable();
            $table->timestamp('finished_at')->nullable();
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
        Schema::dropIfExists('schedules');
    }
}
