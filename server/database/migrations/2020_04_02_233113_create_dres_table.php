<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('dres', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('unity')->nullable();
            $table->foreign('unity')->references('id')->on('unities');
            $table->decimal('receita_bruta_vendas', 10, 2)->nullable();
            $table->decimal('impostos_sem_vendas', 10, 2)->nullable();
            $table->decimal('receita_liquida_vendas', 10, 2)->nullable();
            $table->decimal('custos_produtos_vendidos', 10, 2)->nullable();
            $table->decimal('lucro_bruto', 10, 2)->nullable();
            $table->decimal('despesas_vendas', 10, 2)->nullable();
            $table->decimal('despesas_gerais_administrativas', 10, 2)->nullable();
            $table->decimal('impostos_taxas', 10, 2)->nullable();
            $table->decimal('despesas_depreciacoes_amortizacoes', 10, 2)->nullable();
            $table->decimal('equivalencia_patrimonial', 10, 2)->nullable();
            $table->decimal('outras_receitas', 10, 2)->nullable();
            $table->decimal('receitas_financeiras', 10, 2)->nullable();
            $table->decimal('despesas_financeiras', 10, 2)->nullable();
            $table->decimal('lucro_operacional', 10, 2)->nullable();
            $table->decimal('receitas_nao_operacionais', 10, 2)->nullable();
            $table->decimal('lucro_liquido', 10, 2)->nullable();
            $table->date('data_exercicio')->nullable();
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
        Schema::dropIfExists('dres');
    }
}
