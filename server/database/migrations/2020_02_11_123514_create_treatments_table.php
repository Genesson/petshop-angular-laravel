<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTreatmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('treatments', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('consultation_id')->nullable();
            $table->foreign('consultation_id')->references('id')->on('consultations');
            $table->string('remedy_name')->nullable();
            $table->integer('number_of_days')->nullable();
            $table->string('use_type')->nullable();
            $table->integer('times_day')->nullable();
            $table->integer('amount')->nullable();
            $table->string('unity_type')->nullable();
            $table->longText('observations')->nullable();
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
        Schema::dropIfExists('treatments');
    }
}
