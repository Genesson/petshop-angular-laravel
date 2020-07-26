<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityChecksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_checks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->string('description')->nullable();
            $table->enum('type', ['CHECK-IN', 'CHECK-OUT'])->nullable();
            $table->time('hour')->nullable();
            $table->boolean('sunday')->nullable();
            $table->boolean('monday')->nullable();
            $table->boolean('tuesday')->nullable();
            $table->boolean('wednesday')->nullable();
            $table->boolean('thursday')->nullable();
            $table->boolean('friday')->nullable();
            $table->boolean('saturday')->nullable();
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
        Schema::dropIfExists('unity_checks');
    }
}
