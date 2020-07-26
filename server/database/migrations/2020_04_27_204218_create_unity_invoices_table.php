<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnityInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unity_invoices', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('invoice_key');
            $table->integer('number');
            $table->datetime('date');
            $table->string('price');
            $table->string('status');
            $table->string('type');

            $table->unsignedInteger('unity_id');
            $table->foreign('unity_id')->references('id')->on('unities')->onDelete('CASCADE');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('unity_invoices');
    }
}
