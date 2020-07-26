<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDaycaresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('daycares', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer("pet")->unsigned();
            $table->foreign("pet")->references("id")->on("pets");
            $table->integer("schedule")->unsigned();
            $table->foreign("schedule")->references("id")->on("schedules");
            $table->enum('action', ['PRESENCE', 'PEED', 'POOPED', 'FIST_MEAT', 'SECOND_MEAT', 'OBSERVATION_MEAT'])->nullable();
            $table->boolean('presence')->nullable();
            $table->timestamp('presence_date')->nullable();
            $table->enum('first_meat', ['NENHUMA', 'RECUSOU', 'COMEU_TUDO'])->nullable();
            $table->timestamp('first_meat_date')->nullable();
            $table->enum('second_meat', ['NENHUMA', 'RECUSOU', 'COMEU_TUDO'])->nullable();
            $table->timestamp('second_meat_date')->nullable();
            $table->boolean("peed")->nullable();
            $table->timestamp('peed_date')->nullable();
            $table->boolean("pooped")->nullable();
            $table->timestamp('pooped_date')->nullable();
            $table->text("observation")->nullable();
            $table->timestamp('observation_date')->nullable();
            $table->boolean("out")->nullable();
            $table->timestamp('out_date')->nullable();
            $table->boolean("status")->nullable();
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
        Schema::dropIfExists('daycares');
    }
}
