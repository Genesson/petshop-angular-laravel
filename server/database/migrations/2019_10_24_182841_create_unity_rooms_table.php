<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_rooms', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->string('description')->nullable();
            $table->integer('number')->nullable();
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
        Schema::dropIfExists('unity_rooms');
    }
}
