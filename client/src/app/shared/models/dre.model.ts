import { UnityModel } from './unity.model';

export interface DreModel {
    id?: number;
    unity: UnityModel;
    receita_bruta_vendas: number;
    impostos_sem_vendas: number;
    receita_liquida_vendas: number;
    custos_produtos_vendidos: number;
    lucro_bruto: number;
    despesas_vendas: number;
    despesas_gerais_administrativas: number;
    impostos_taxas: number;
    despesas_depreciacoes_amortizacoes: number;
    equivalencia_patrimonial: number;
    outras_receitas: number;
    receitas_financeiras: number;
    despesas_financeiras: number;
    lucro_operacional: number;
    receitas_nao_operacionais: number;
    lucro_liquido: number;
    data_exercicio: Date;
}
