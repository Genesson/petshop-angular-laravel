<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Package;

class CreatePackagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('packages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->integer('service')->nullable();
            $table->foreign('service')->references('id')->on('unity_services');
            $table->string('name');
            $table->integer('days');
            $table->decimal('price', 12, 2);
            $table->integer('promotional_days')->nullable();
            $table->decimal('promotional_price', 12, 2)->nullable();
            $table->decimal('promotional_percent', 5, 2)->nullable();
            $table->integer('toast_before')->nullable();
            $table->string('toast_name')->nullable();
            $table->date('package_until')->nullable();
            $table->boolean('status')->default(true);
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
        Schema::dropIfExists('packages');
    }
}
