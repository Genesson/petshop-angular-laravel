<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAdressesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_adresses', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user')->unsigned();
            $table->foreign('user')->references('id')->on('users');
            $table->string('zipcode')->nullable();
            $table->string('street')->nullable();
            $table->string('number')->nullable();
            $table->string('district')->nullable();
            $table->string('complement')->nullable();
            $table->integer('country')->nullable();
            $table->integer('province')->nullable();
            $table->integer('city')->nullable();
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
        Schema::dropIfExists('user_adresses');
    }
}
