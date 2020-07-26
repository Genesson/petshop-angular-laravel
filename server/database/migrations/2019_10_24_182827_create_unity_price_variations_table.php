<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityPriceVariationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_price_variations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->string('description')->nullable();
            $table->date('start')->nullable();
            $table->date('end')->nullable();
            $table->decimal('value', 10, 2)->nullable();
            $table->float('percent')->nullable();
            $table->enum('module', ['SHOWER', 'SUB_SHOWER', 'TRANSPORT', 'PET_SITTER', 'DAY_CARE', 'HOTEL', 'OTHER'])->nullable();
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
        Schema::dropIfExists('unity_price_variations');
    }
}
