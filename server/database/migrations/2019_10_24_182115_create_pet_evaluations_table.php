<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePetEvaluationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pet_evaluations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('pet')->nullable();
            $table->foreign('pet')->references('id')->on('pets');
            $table->date('first_date')->nullable();
            $table->text('description')->nullable();
            $table->enum('liked_pool', ['SIM', 'NAO', 'OUTROS'])->nullable();
            $table->string('pool_obs')->nullable();
            $table->enum('hydration', ['SIM', 'NAO', 'OUTROS'])->nullable();
            $table->string('hydration_obs')->nullable();
            $table->enum('pee_poop', ['NORMAL', 'APENAS_XIXI', 'APENAS_COCO', 'NENHUM'])->nullable();
            $table->text('behavior')->nullable();
            $table->integer('frequency')->nullable();
            $table->text('reason')->nullable();
            $table->boolean('test')->nullable();
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
        Schema::dropIfExists('pet_evaluations');
    }
}
