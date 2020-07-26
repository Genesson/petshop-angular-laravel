<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->integer('user')->nullable();
            $table->foreign('user')->references('id')->on('users');
            $table->integer('service')->nullable();
            $table->foreign('service')->references('id')->on('unity_services');
            $table->integer('size')->nullable();
            $table->foreign('size')->references('id')->on('pet_sizes');
            $table->integer('breed')->nullable();
            $table->foreign('breed')->references('id')->on('pet_breeds');
            $table->integer('type_fur')->nullable();
            $table->foreign('type_fur')->references('id')->on('pet_type_furs');
            $table->integer('region')->nullable();
            $table->foreign('region')->references('id')->on('unity_regions');
            $table->string('description')->nullable();
            $table->longText('modules')->nullable();
            $table->enum('period', ['MEIA', 'INTEIRA', 'PERNOITE'])->nullable();
            $table->integer('time')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->enum('type', ['SHOWER', 'SUB_SHOWER', 'TRANSPORT', 'PET_SITTER', 'DAY_CARE', 'HOTEL', 'OTHER'])->nullable();
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
        Schema::dropIfExists('unity_services');
    }
}
