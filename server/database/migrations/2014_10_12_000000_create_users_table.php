<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('cod_erp')->nullable();
            $table->string('avatar')->nullable();
            $table->boolean('foreign')->nullable();
            $table->string('name')->nullable();
            $table->string('date_birth')->nullable();
            $table->string('cpf')->nullable();
            $table->string('rg')->nullable();
            $table->string('document')->nullable();
            $table->string('passport')->nullable();
            $table->string('phone')->nullable();
            $table->string('cell_phone')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('phone_residential')->nullable();
            $table->string('phone_company')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password')->nullable();
            $table->string('second_name')->nullable();
            $table->string('second_cpf')->nullable();
            $table->string('second_phone')->nullable();
            $table->enum('role', [
                'OWNER',
                'RH',
                'INOVACAO',
                'FINANCEIRO',
                'AUX_ADMIN',
                'ADMIN',
                'COORDENADOR',
                'GERENTE_GERAL',
                'GERENTE_MKT_VENDAS',
                'GERENTE_VENDAS',
                'GERENTE_COMPRAS',
                'GERENTE_LOJA',
                'GERENTE_HOTEL_CRECHE',
                'GERENTE_EQUIPE',
                'GERENTE',
                'VENDEDOR',
                'RECEPCIONISTA',
                'ATENDENTE',
                'SECRETARIA',
                'AUX_1',
                'AUX_2',
                'AUX_3',
                'AUX_4',
                'SERVICOS_GERAIS',
                'ESTAGIARIO_1',
                'ESTAGIARIO_2',
                'ESTAGIARIO_3',
                'ESTAGIARIO_4',
                'GERENTE_MONITORES',
                'MONITOR',
                'GERENTE_BANHO_TOSA',
                'TOSADOR',
                'BANHISTA',
                'MOTORISTA',
                'GERENTE_LIMPEZA',
                'FAXINEIRO',
                'VETERINARIO',
                'GERENTE_HOSPITAL',
                'AUX_VET',
                'SERVICO_1',
                'SERVICO_2',
                'SERVICO_3',
                'SERVICO_4',
                'SERVICO_5',
                'SERVICO_6',
                'EMPLOYEE',
                'CLIENT'
            ])->nullable();
            $table->enum('gender', ['MALE', 'FEMALE'])->nullable();
            $table->string('status')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
