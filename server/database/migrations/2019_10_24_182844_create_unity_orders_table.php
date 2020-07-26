<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->integer('user')->nullable();
            $table->foreign('user')->references('id')->on('users');
            $table->bigInteger('pet')->nullable();
            $table->foreign('pet')->references('id')->on('pets');
            $table->bigInteger('schedule')->nullable();
            $table->foreign('schedule')->references('id')->on('schedules');
            $table->enum('payment_form', ['VISTA', 'PRAZO'])->nullable();
            $table->decimal('amount', 10 , 2)->nullable();
            $table->decimal('discount', 10 , 2)->nullable();
            $table->timestamp('receivement_at')->nullable();
            $table->string('status')->default('Aberta');
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
        Schema::dropIfExists('unity_orders');
    }
}
