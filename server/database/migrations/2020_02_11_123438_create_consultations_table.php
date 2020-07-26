<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateConsultationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('consultations', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('pet')->nullable();
            $table->foreign('pet')->references('id')->on('pets');
            $table->float('current_weight')->nullable();
            $table->float('temperature')->nullable();
            $table->longText('anamnesis')->nullable();
            $table->longText('diagnosis')->nullable();
            $table->longText('exams')->nullable();
            $table->boolean("status")->default(true);
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
        Schema::dropIfExists('consultations');
    }
}
