<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permissions', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->string('description')->nullable();
            $table->boolean('pets')->nullable();
            $table->boolean('daily')->nullable();
            $table->boolean('users')->nullable();
            $table->boolean('settings')->nullable();
            $table->boolean('cashier')->nullable();
            $table->boolean('vet')->nullable();
            $table->boolean('reports')->nullable();
            $table->boolean('products')->nullable();
            $table->boolean('tutors')->nullable();
            $table->boolean('units')->nullable();
            $table->boolean('invoices')->nullable();
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
        Schema::dropIfExists('permissions');
    }
}
