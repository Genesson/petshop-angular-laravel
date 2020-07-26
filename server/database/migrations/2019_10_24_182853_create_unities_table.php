<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUnitiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('unities', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('razao_social')->nullable();
            $table->string('fantasy')->nullable();
            $table->string('email')->nullable();
            $table->string('cnpj')->nullable();
            $table->string('ie')->nullable();
            $table->enum('nfe', ['PRODUCAO', 'HOMOLOGACAO'])->nullable();
            $table->string('color')->nullable();
            $table->string('logo')->nullable();
            $table->string('zipcode')->nullable();
            $table->string('street')->nullable();
            $table->string('number')->nullable();
            $table->string('district')->nullable();
            $table->bigInteger('country')->unsigned()->nullable();
            $table->bigInteger('province')->unsigned();
            $table->bigInteger('city')->unsigned();
            $table->boolean('sunday')->nullable();
            $table->boolean('monday')->nullable();
            $table->boolean('tuesday')->nullable();
            $table->boolean('wednesday')->nullable();
            $table->boolean('thursday')->nullable();
            $table->boolean('friday')->nullable();
            $table->boolean('saturday')->nullable();
            $table->time('hour_sunday_in')->nullable();
            $table->time('hour_sunday_interval_in')->nullable();
            $table->time('hour_sunday_interval_out')->nullable();
            $table->time('hour_sunday_out')->nullable();
            $table->time('hour_monday_in')->nullable();
            $table->time('hour_monday_interval_in')->nullable();
            $table->time('hour_monday_interval_out')->nullable();
            $table->time('hour_monday_out')->nullable();
            $table->time('hour_tuesday_in')->nullable();
            $table->time('hour_tuesday_interval_in')->nullable();
            $table->time('hour_tuesday_interval_out')->nullable();
            $table->time('hour_tuesday_out')->nullable();
            $table->time('hour_wednesday_in')->nullable();
            $table->time('hour_wednesday_interval_in')->nullable();
            $table->time('hour_wednesday_interval_out')->nullable();
            $table->time('hour_wednesday_out')->nullable();
            $table->time('hour_thursday_in')->nullable();
            $table->time('hour_thursday_interval_in')->nullable();
            $table->time('hour_thursday_interval_out')->nullable();
            $table->time('hour_thursday_out')->nullable();
            $table->time('hour_friday_in')->nullable();
            $table->time('hour_friday_interval_in')->nullable();
            $table->time('hour_friday_interval_out')->nullable();
            $table->time('hour_friday_out')->nullable();
            $table->time('hour_saturday_in')->nullable();
            $table->time('hour_saturday_interval_in')->nullable();
            $table->time('hour_saturday_interval_out')->nullable();
            $table->time('hour_saturday_out')->nullable();
            $table->string('status')->nullable();
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
        Schema::dropIfExists('unities');
    }
}
