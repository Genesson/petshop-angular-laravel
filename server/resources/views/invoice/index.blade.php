<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Invoice</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

        <style>
        body {
            font-size: 10px;
        }
        .container-row {
            width: 70%;
            margin:10px;
            border-radius: 10px;
            border:1px solid gray;
        }

        .container-title {
            background-color:orange;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            display: flex;
            justify-content: ;
            align-content: center;
            padding: 5px;
        }

        .container-table {
            margin: 10px;
            border-radius: 10px;
            border: 1px solid gray;
        }

        .table-header {
            background-color:orange;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 5px;
        }

        </style>
    </head>
    <body>
        <div class="flex-center position-ref full-height">
            <div class="row container-row">
                <div class="col-lg-12 container-title">
                    <h4> Nota Fiscal </h4>
                </div>

                <div class="col">
                    <label> Modelo: </label>
                    <br />
                    <span> {{$data['nfe']['model']}} </span>
                </div>

                <div class="col">
                    <label> Série: </label>
                    <br />
                    <span> {{$data['nfe']['series']}} </span>
                </div>

                <div class="col">
                    <label> Número: </label>
                    <br />
                    <span> {{$data['nfe']['number']}} </span>
                </div>

                <div class="col">
                    <label> Emissão: </label>
                    <span> {{$data['nfe']['emission_date']}} </span>
                    <br />
                </div>

                <div class="col">
                    <label> Série: </label>
                    <br />
                    <span> {{$data['nfe']['series']}} </span>
                </div>

                <div class="col">
                    <label> Chave de acesso: </label>
                    <br />
                    <span> {{$data['nfe']['access_key']}} </span>
                </div>
            </div>

            <div class="row container-row">
                <div class="col-lg-12 container-title">
                <H4> Fornecedor:</H4>
                </div>

                <div class="col">
                    <label> CNPJ: </label>
                    <br />
                    <span> {{$data['provider']['cnpj']}} </span>
                </div>

                <div class="col">
                    <label> Razão social: </label>
                    <br />
                    <span> {{$data['provider']['company_name']}} </span>
                </div>

                <div class="col">
                    <label> Razão social: </label>
                    <br />
                    <span> {{$data['provider']['company_name']}} </span>
                </div>

                <!-- Nome fantasia -->

                <div class="col">
                    <label> I.E: </label>
                    <br />
                    <span> {{$data['provider']['ie']}} </span>
                </div>

                <div class="col">
                    <label> Endereço: </label>
                    <br />
                    <span> {{$data['provider']['address']}} </span>
                </div>

                <div class="col">
                    <label> Endereço: </label>
                    <br />
                    <span> {{$data['provider']['district']}} </span>
                </div>

                <div class="col">
                    <label> Bairro: </label>
                    <br />
                    <span> {{$data['provider']['district']}} </span>
                </div>

                <div class="col">
                    <label> CEP: </label>
                    <br />
                    <span> {{$data['provider']['cep']}} </span>
                </div>

                <div class="col">
                    <label> Municipio: </label>
                    <br />
                    <span> {{$data['provider']['municipio']}} </span>
                </div>

                <div class="col">
                    <label> UF: </label>
                    <br />
                    <span> {{$data['provider']['uf']}} </span>
                </div>
            </div>


            <div style="margin:10px;">
            <h4>Produtos:</h4>

            <!-- Products table -->
            <table class="table container-table" >
                <thead class="table-header">
                    <tr>
                    <th scope="col">Nr</th>
                    <th scope="col">Produto</th>
                    <th scope="col">EAN</th>
                    <th scope="col">Cód.fom.</th>
                    <th scope="col">Unid.</th>
                    <th scope="col">Vl.unit.</th>
                    <th scope="col">Qtde.</th>
                    <th scope="col">Total</th>
                    <th scope="col">Produto associado</th>
                    <th scope="col">Unidade de comercialização</th>
                    <th scope="col">Qt. entrada de estoque</th>
                    <th scope="col">Preço custo</th>
                    <th scope="col">Mrg. Lucro</th>
                    <th scope="col">Preço venda</th>
                    <th scope="col">Classificação</th>
                    <th scope="col">Fabricante</th>
                    <th scope="col">NCM</th>
                    <th scope="col">CFOP</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($data['products'] as $product)
                    <tr>
                        <td>{{$product['id']}}</td>
                        <td>{{$product['name']}}</td>
                        <td>{{$product['ean']}}</td>
                        <td>{{$product['cfom']}}</td>
                        <td>{{$product['unity']}}</td>
                        <td>R$ {{$product['unity_price']}}</td>
                        <td>{{$product['quantity']}}</td>

                        <td>{{$product['total']}}</td>

                        <td>
                            <div class="form-group">
                                <input type="text" class="form-control" id="assoc_prod_{{$product['id']}}"  placeholder="" value="{{$product['assoc_prod']}}">
                            </div>
                        </td>
                        <td>
                            <div class="form-group">
                                <input type="text" class="form-control" id="unit_comercialization_{{$product['id']}}"  placeholder="" value="{{$product['unit_comercialization']}}">
                            </div>
                        </td>
                        <td>
                        <select class="form-control">
                            <option>Qt estoque</option>
                        </select>
                        </td>
                        <td>
                            <div class="form-group">
                                <input type="text" class="form-control" id="price_cost_{{$product['id']}}"  placeholder="" value="{{$product['price_cost']}}">
                            </div>
                        </td>
                        <td>
                            <div class="form-group">
                                <input type="text" class="form-control" id="profit_margin_{{$product['id']}}"  placeholder="" value="{{$product['profit_margin']}}">
                            </div>
                        </td>
                        <td>
                            <div class="form-group">
                                <input type="text" class="form-control" id="price_sale_{{$product['id']}}"  placeholder="" value="{{$product['price_sale']}}">
                            </div>
                        </td>
                        <td>
                            <select class="form-control">
                                <option>Classificação</option>
                            </select>
                        </td>
                        <td>
                            <select class="form-control">
                                <option>Fabricante</option>
                            </select>
                        </td>

                        <td>{{$product['ncm']}}</td>
                        <td>{{$product['cfop']}}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>


            <!-- Payments table -->
            <table class="table container-table" >
                <thead class="table-header">
                    <tr>
                        <th scope="col">Data do pagamento</th>
                        <th scope="col">Documento</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Inf. adic.</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($data['payments'] as $payment)
                    <tr>
                        <td>{{$payment['date']}}</td>
                        <td>{{$payment['doc']}}</td>
                        <td>{{$payment['value']}}</td>
                        <td>{{$payment['additional_info']}}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>

            </div>
        </div>
    </body>
</html>
