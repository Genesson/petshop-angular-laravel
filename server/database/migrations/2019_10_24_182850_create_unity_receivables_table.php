<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityReceivablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_receivables', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->integer('order')->nullable();
            $table->foreign('order')->references('id')->on('unity_orders');
            $table->string('quota')->nullable();
            $table->decimal('value', 10 , 2)->nullable();
            $table->enum('payment_with', ['DINHEIRO', 'CARTAO', 'CHEQUE', 'DEPOSITO'])->nullable();
            $table->bigInteger('flag')->nullable();
            $table->foreign('flag')->references('id')->on('unity_card_flags');
            $table->integer('voucher_number')->nullable();
            $table->enum('cpf', ['SIM', 'NAO'])->nullable();
            $table->string('cpf_number')->nullable();
            $table->timestamp('expiration')->nullable();
            $table->boolean('last')->nullable();
            $table->timestamp('receivement_at')->nullable();
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
        Schema::dropIfExists('unity_receivables');
    }
}
