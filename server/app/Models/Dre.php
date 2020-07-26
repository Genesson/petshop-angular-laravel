<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dre extends Model
{
    protected $fillable = [
        'unity',
        'receita_bruta_vendas',
        'impostos_sem_vendas',
        'receita_liquida_vendas',
        'custos_produtos_vendidos',
        'lucro_bruto',
        'despesas_vendas',
        'despesas_gerais_administrativas',
        'impostos_taxas',
        'despesas_depreciacoes_amortizacoes',
        'equivalencia_patrimonial',
        'outras_receitas',
        'receitas_financeiras',
        'despesas_financeiras',
        'lucro_operacional',
        'receitas_nao_operacionais',
        'lucro_liquido',
        'data_exercicio'
    ];
}
