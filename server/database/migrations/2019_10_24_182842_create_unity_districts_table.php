<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityDistrictsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_districts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->bigInteger('region')->nullable();
            $table->foreign('region')->references('id')->on('unity_regions');
            $table->string('description');
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
        Schema::dropIfExists('unity_districts');
    }
}
