<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityCashiersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_cashiers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->uuid('code')->nullable();
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->integer('user')->nullable();
            $table->foreign('user')->references('id')->on('users');
            $table->decimal('value', 10, 2)->nullable();
            $table->decimal('amount', 10, 2)->nullable();
            $table->string('note')->nullable();
            $table->enum('operation', ['ENTRADA', 'SAIDA'])->nullable();
            $table->enum('action', ['ABERTURA', 'SANGRIA', 'PARCELA', 'REFORCO', 'FECHAMENTO'])->nullable();
            $table->enum('status', ['ABERTO', 'FECHADO'])->nullable();
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
        Schema::dropIfExists('unity_cashiers');
    }
}
