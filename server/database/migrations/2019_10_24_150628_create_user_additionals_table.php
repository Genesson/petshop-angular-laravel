<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAdditionalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_additionals', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user')->unsigned();
            $table->foreign('user')->references('id')->on('users');
            $table->integer('found_us')->nullable();
            $table->string('additional_one')->nullable();
            $table->string('additional_two')->nullable();
            $table->string('additional_three')->nullable();
            $table->text('obs_general')->nullable();
            $table->boolean('has_services')->nullable();
            $table->boolean('special_attention')->nullable();
            $table->boolean('attention')->nullable();
            $table->text('obs_alert')->nullable();
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
        Schema::dropIfExists('user_additionals');
    }
}
