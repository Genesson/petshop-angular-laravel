<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PDF</title>
</head>
<body>
    <style>
        body {
            font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
        }

        .title-header {
            font-size: 18px;
            text-align: center;
        }

        .table {
            width: 100%;
        }

        .table-bordered {
            border-collapse: collapse;
            width: 100%;
        }

        .table-bordered td, .table-bordered th {
            border: 1px solid #ddd;
            padding: 8px;
        }

        .table .title {
            background: #333333;
            color: #ffffff;
            font-size: 14px;
            font-weight: bold;
        }

        .table .subtitle {
            font-size: 14px;
            color: #333333;
        }

        .table .right {
            text-align: right;
        }

        .table .bold {
            font-weight: bold;
        }
    </style>

    <h1 class="title-header">Demonstração do Resultado do Exercício: {{ $dre->data_exercicio }}.</h1>
    <table class="table table-bordered">
        <tbody>
            <tr>
                <td class="title">RECEITA BRUTA DE VENDAS</td>
                <td class="title right">R$ {{ number_format($dre->receita_bruta_vendas, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Impostos s/ Vendas (ICMS, PIS, Cofins e ISS)</td>
                <td class="subtitle right">-R$ {{ number_format($dre->impostos_sem_vendas, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="title">RECEITA LÍQUIDA DE VENDAS</td>
                <td class="title right">R$ {{ number_format($dre->receita_liquida_vendas, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Custo dos Produtos e Mercadorias Vendidas</td>
                <td class="subtitle right">-R$ {{ number_format($dre->custos_produtos_vendidos, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="title">LUCRO BRUTO</td>
                <td class="title right">R$ {{ number_format($dre->lucro_bruto, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Despesas com Vendas</td>
                <td class="subtitle right">-R$ {{ number_format($dre->despesas_vendas, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Despesas Gerais e Administrativas</td>
                <td class="subtitle right">-R$ {{ number_format($dre->despesas_gerais_administrativas, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Impostos e Taxas</td>
                <td class="subtitle right">-R$ {{ number_format($dre->impostos_taxas, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Despesas com Depreciações e Amortizações</td>
                <td class="subtitle right">-R$ {{ number_format($dre->despesas_depreciacoes_amortizacoes, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Equivalencia Patrimonial</td>
                <td class="subtitle right">R$ {{ number_format($dre->equivalencia_patrimonial, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Outras Receitas (Desp) Operacionais Líquidas</td>
                <td class="subtitle right">R$ {{ number_format($dre->outras_receitas, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Receitas Financeiras</td>
                <td class="subtitle right">R$ {{ number_format($dre->receitas_financeiras, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Despesas Financeiras</td>
                <td class="subtitle right">-R$ {{ number_format($dre->despesas_financeiras, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="title">LUCRO OPERACIONAL</td>
                <td class="title right">R$ {{ number_format($dre->lucro_operacional, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle">Receitas Não Operacionais Líquidas</td>
                <td class="subtitle right">R$ {{ number_format($dre->receitas_nao_operacionais, 2, ',', '.') }}</td>
            </tr>
            <tr>
                <td class="subtitle bold">LUCRO LÍQUIDO DO EXERCÍCIO</td>
                <td class="subtitle right bold">R$ {{ number_format($dre->lucro_liquido, 2, ',', '.') }}</td>
            </tr>
        </tbody>
      </table>
</body>
</html>
