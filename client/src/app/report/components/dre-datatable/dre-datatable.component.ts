import { Component, OnInit, Input, SimpleChanges, OnChanges, EventEmitter, Output } from '@angular/core';

import {DreModel} from '../../../shared/models/dre.model';

@Component({
    selector: 'app-dre-datatable',
    templateUrl: './dre-datatable.component.html',
    styleUrls: ['./dre-datatable.component.scss'],
})
export class DreDatatableComponent implements OnInit, OnChanges {

    @Input() dre: DreModel;

    @Output() clickConfirm = new EventEmitter();

    public rows;

    constructor() {}

    ngOnInit() {
    }

    ngOnChanges(change: SimpleChanges) {
        if (change.dre && change.dre.currentValue) {
            this.rows = [
                {
                    title: 'RECEITA BRUTA DE VENDAS',
                    module: 'RECEITA_BRUTA_VENDAS',
                    id: this.dre.id,
                    value: this.dre.receita_bruta_vendas,
                    receita: true,
                    child: false,
                    editable: false,
                },
                {
                    title: 'Impostos s/ Vendas (ICMS, PIS, Cofins e ISS)',
                    module: 'IMPOSTOS_SEM_VENDAS',
                    id: this.dre.id,
                    value: this.dre.impostos_sem_vendas,
                    receita: false,
                    child: true,
                    editable: true,
                },
                {
                    title: 'RECEITA LÍQUIDA DE VENDAS',
                    module: 'RECEITA_LIQUIDA_VENDAS',
                    id: this.dre.id,
                    value: this.dre.receita_liquida_vendas,
                    receita: true,
                    child: false,
                    editable: false,
                },
                {
                    title: 'Custo dos Produtos e Mercadorias Vendidas',
                    module: 'CUSTOS_PRODUTOS_VENDIDOS',
                    id: this.dre.id,
                    value: this.dre.custos_produtos_vendidos,
                    receita: false,
                    child: true,
                    editable: true,
                },
                {
                    title: 'LUCRO BRUTO',
                    module: 'LUCRO_BRUTO',
                    id: this.dre.id,
                    value: this.dre.lucro_bruto,
                    receita: true,
                    child: false,
                    editable: false,
                },
                {
                    title: 'Despesas com Vendas',
                    module: 'DESPESAS_VENDAS',
                    id: this.dre.id,
                    value: this.dre.despesas_vendas,
                    receita: false,
                    child: true,
                    editable: true,
                },
                {
                    title: 'Despesas Gerais e Administrativas',
                    module: 'DESPESAS_GERAIS_ADMINISTRATIVAS',
                    id: this.dre.id,
                    value: this.dre.despesas_gerais_administrativas,
                    receita: false,
                    child: true,
                    editable: true,
                },
                {
                    title: 'Impostos e Taxas',
                    module: 'IMPOSTOS_TAXAS',
                    id: this.dre.id,
                    value: this.dre.impostos_taxas,
                    receita: false,
                    child: true,
                    editable: true,
                },
                {
                    title: 'Despesas com Depreciações e Amortizações',
                    module: 'DESPESAS_DEPRECIACOES_AMORTIZACOES',
                    id: this.dre.id,
                    value: this.dre.despesas_depreciacoes_amortizacoes,
                    receita: false,
                    child: true,
                    editable: true,
                },
                {
                    title: 'Equivalencia Patrimonial',
                    module: 'EQUIVALENCIA_PATRIMONIAL',
                    id: this.dre.id,
                    value: this.dre.equivalencia_patrimonial,
                    receita: true,
                    child: true,
                    editable: true,
                },
                {
                    title: 'Outras Receitas (Desp) Operacionais Líquidas',
                    module: 'OUTRAS_RECEITAS',
                    id: this.dre.id,
                    value: this.dre.outras_receitas,
                    receita: true,
                    child: true,
                    editable: true,
                },
                {
                    title: 'Receitas Financeiras',
                    module: 'RECEITAS_FINANCEIRAS',
                    id: this.dre.id,
                    value: this.dre.receitas_financeiras,
                    receita: true,
                    child: true,
                    editable: true,
                },
                {
                    title: 'Despesas Financeiras',
                    module: 'DESPESAS_FINANCEIRAS',
                    id: this.dre.id,
                    value: this.dre.despesas_financeiras,
                    receita: false,
                    child: true,
                    editable: true,
                },
                {
                    title: 'LUCRO OPERACIONAL',
                    module: 'LUCRO_OPERACIONAL',
                    id: this.dre.id,
                    value: this.dre.lucro_operacional,
                    receita: true,
                    child: false,
                    editable: false,
                },
                {
                    title: 'Receitas Não Operacionais Líquidas',
                    module: 'RECEITAS_NAO_OPERACIONAIS',
                    id: this.dre.id,
                    value: this.dre.receitas_nao_operacionais,
                    receita: true,
                    child: true,
                    editable: true,
                },
                {
                    title: 'LUCRO LÍQUIDO DO EXERCÍCIO',
                    module: 'LUCRO_LIQUIDO',
                    id: this.dre.id,
                    value: this.dre.lucro_liquido,
                    receita: true,
                    child: true,
                    editable: false,
                },
            ];
        }
    }

}
