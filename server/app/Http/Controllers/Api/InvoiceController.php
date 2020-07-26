<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \App\Models\UnityOrder;
use \App\Models\UnityReceivable;
use \App\Models\Product;
use Orchestra\Parser\Xml\Facade as XmlParser;
use App\Models\UnityInvoice;
use GuzzleHttp\Client;
use Carbon\Carbon;

class InvoiceController extends Controller
{
    protected $guzzle_client;
    protected $base_manager_sas_api = "https://managersaas.tecnospeed.com.br:8081";

    public function __construct(Client $client)
    {
        $this->guzzle_client = $client;
    }

    public function consultas(Request $request)
    {
        $total = $request->total ?? 30;
        $type = $request->type ?? 'nfce';
        $invoices = UnityInvoice::orderBy('id', 'DESC')->paginate($total);

        return response()->json(['data' => $invoices]);
    }

    public function show($invoice_id)
    {
        $type = "nfce";
        $configs = $this->getRequestConfigs();

        $params = [
            'Grupo' => 'PetShop',
            'CNPJ' => '17651262000119',
            'Filtro' => "chave={$invoice_id}",
            'campos' => 'handle, chave,situacao,nnf,impressora,nrecibo,nprotenvio,nprotcanc,ambiente,modoentrada,modosaida,cnpj,serie,idgrupo,dtautorizacao,dtcadastro,dtcancelamento,idintegracao,dtemissao,impresso,envemail,email,codnf'
        ];


        $url = "{$this->base_manager_sas_api}/ManagerAPIWeb/$type/consulta?" . http_build_query($params);
        $consulta = $this->guzzle_client->get($url, [
            'headers' => $configs['headers'],
        ])->getBody()->getContents();

        $consulta = explode(',', $consulta);
        return response()->json([
            'invoice_data' => [
                'handle' => $consulta[0],
                'chave' => $consulta[1],
                'situacao' => $consulta[2],
                'nnf' => $consulta[3],
                'impressora'  => $consulta[4],
                'nrecibo' => $consulta[5],
                'nprotenvio'  => $consulta[6],
                'nprotcanc' => $consulta[7],
                'ambiente'  => $consulta[8],
                'modoentrada'  => $consulta[9],
                'modosaida' => $consulta[10],
                'cnpj' => $consulta[11],
                'serie' => $consulta[12],
                'idgrupo' => $consulta[13],
                'dtautorizacao'  => $consulta[14],
                'dtcadastro'  => $consulta[15],
                'dtcancelamento' => $consulta[16],
                'idintegracao' => $consulta[17],
                'dtemissao' => $consulta[18],
                'impresso' => $consulta[19],
                'envemail' => $consulta[20],
                'email' => $consulta[21],
                'codnf' => $consulta[22],
            ]
        ]);
    }

    public function index()
    {
        $xml = simplexml_load_string(file_get_contents(__DIR__  . '/../../../../invoice-data.xml'));

        $data = [];
        $data['nfe'] = [
            'model' => trim($xml->NFe->infNFe->ide->mod),
            'series' => trim($xml->NFe->infNFe->ide->serie),
            'number' => trim($xml->NFe->infNFe->ide->nNF),
            'emission_date' => trim($xml->NFe->infNFe->ide->dhEmi),

            // Check // valor total de produtos e valor total N.F
            'price' => trim($xml->NFe->infNFe->ide->verProc),
            'access_key' => trim($xml->NFe->infNFe['Id'])
        ];

        $data['provider'] = [
            'cnpj' => trim($xml->NFe->infNFe->emit->CNPJ),
            'address' => trim($xml->NFe->infNFe->emit->enderEmit->xLgr) . trim($xml->NFe->infNFe->emit->enderEmit->nro),
            'district' => trim($xml->NFe->infNFe->emit->enderEmit->xBairro),
            'cep' => trim($xml->NFe->infNFe->emit->enderEmit->CEP),
            'municipio' => trim($xml->NFe->infNFe->emit->enderEmit->xMun),
            'uf' => trim($xml->NFe->infNFe->emit->enderEmit->UF),
            'ie' => trim($xml->NFe->infNFe->emit->IE),
            'company_name' => trim($xml->NFe->infNFe->emit->xNome), // razao social
            // @check nome Fantasia?
        ];

        $data['products'] = [];

        foreach ($xml->NFe->infNFe->det as $det) {
            $data['products'][] = [
                'id' => trim($det['nItem']),
                'name' => trim($det->prod->xProd),
                'ean' => trim($det->prod->cEAN),
                'unity' => trim($det->prod->uCom),
                'unity_price' => trim($det->prod->vProd),
                'quantity' => trim($det->prod->qCom),
                'total' => number_format(trim($det->prod->vProd) * trim($det->prod->qCom), 2, ',', ''),
                'cfom' => '',
                'assoc_prod' => '', // produto associado
                'unit_comercialization' => '', // unidade comercialização
                'qt_stock' => '', // qt entrada estoque
                'price_cost' => '', // preço custo
                'profit_margin' => '', // mrg lucro
                'price_sale' => '', // preço venda
                'classification' => '', // classificacao
                'manufacturing' => '', // fabricante
                'ncm' => trim($det->prod->NCM),
                'cfop' => trim($det->prod->CFOP),
            ];
        }

        $data['payments'] = [];

        $payments = $xml->NFe->infNFe->cobr->dup;
        if (!is_array($payments)) {
            $payments = [$payments];
        }

        foreach ($payments as $dup) {
            $data['payments'][] = [
                'date' => trim($dup->dVenc),
                'doc' => trim($dup->nDup),
                'value' => trim($dup->vDup),
                'additional_info' => 'BOLETO' // default as Boleto.
            ];
        }

        // return view('invoice.index', ['data' => $data]);
        return response()->json($data, 200);
    }

    public function sendNFe(Request $request)
    {
        $configs = $this->getRequestConfigs();
        $cnpj = $request->cnpj;
        $order = UnityOrder::find($request->order_id);

        if (!$order) {
            return response()->json(['error' => "order not found with id $request->order_id"], 400);
        }

        $unity = \App\Models\Unity::find($order->unity);

        $type = $request->type ?? 'nfce';
        $tx_file = "formato=tx2\n";
        $this->environment = $request->environment == 'prod' ? "1" : "2";

        if ( $type == 'nfce') {
            $url = "$this->base_manager_sas_api/ManagerAPIWeb/nfce/envia";
            $this->getNFCE($tx_file, $unity, $order);
        } else {
            $url = "$this->base_manager_sas_api/ManagerAPIWeb/nfse/envia";
            $this->getNFSE($tx_file);
        }

        $params = [
            'Grupo' => 'PetShop',
            'CNPJ' => str_replace(['.', '/', '-'], '', $request->cnpj),
            'arquivo' => $tx_file
        ];

        if ($type == 'nfse') {
            $params['NomeCidade'] = "FozDoIguacuPR";
            $params['Encode'] = 'True';
        }

       try {
            $response = $this->guzzle_client->post($url, [
                'headers' => $configs['headers'],
                'form_params' => $params
            ]);

            if($type = 'nfse') {
                dd($response->getBody()->getContents());
            }

            $response = explode(',', str_replace('"', '', $response->getBody()->getContents()));

        } catch (\Exception $e) {
            throw $e;
        }

        // parte da consulta
        unset($params['arquivo']);
        $invoice_key = trim($response[1]);
        $params['Filtro'] = "chave={$invoice_key}";
        $params['Campos'] = "nnf,dtemissao,valorTotal,situacao";

        $url =  "{$this->base_manager_sas_api}/ManagerAPIWeb/$type/consulta?". http_build_query($params);

        $consulta = $this->guzzle_client->get($url, [
            'headers' => $configs['headers'],
        ]);

        $consulta = $consulta->getBody()->getContents();
        $consulta = explode(',', $consulta);

        if(count($consulta) <= 1) {
            return response()->json([
                'error' => $consulta
            ]);
        }

        $unity_invoice = UnityInvoice::updateOrCreate(['invoice_key' => $invoice_key], [
            'number' => $consulta[0],
            'date' => Carbon::parse(str_replace('/', '-', $consulta[1])),
            'price' => $consulta[2],
            'status' => trim($consulta[3]),
            'unity_id' => $unity->id,
            'type' => $type
        ]);

        return response()->json([
            'data' => $unity_invoice
        ]);


    }

    protected function getNFCE(&$tx_file, $unity, $order)
    {
        // $request->unity_id

        $city = $unity->city()->first();
        $province = $city->province()->first();

        $tx_file .= "numlote=1\n";
        $tx_file .= "INCLUIR\n";
        $tx_file .= "Id_A03=\n";
        $tx_file .= "versao_A02=4.00\n";
        $tx_file .= "cUF_B02=41\n"; // TODO: Código do UF
        $tx_file .= "cMunFG_B12=4108304\n"; // TODO: Código do municipio

        $tx_file .= "cNF_B03=7546\n"; // Código Numérico que compõe a Chave de Acesso (foi posto um num aleatorio) CHECK
        $tx_file .= "natOp_B04=VENDA MERC.\n"; /// Descrição da Natureza da Operação CHECK
        $tx_file .= "mod_B06=65\n"; // NFCe
        $tx_file .= "serie_B07=10\n"; // Série do documento fiscal
        $tx_file .= "nNF_B08=0\n"; // Número do documento fiscal
        $tx_file .= "dhEmi_B09=" . \Carbon\Carbon::now()->timezone("America/Sao_Paulo")->format("Y-m-d\Th:m:sP") . "\n";
        $tx_file .= "tpNF_B11=1\n"; // 0=Entrada; 1=Saída
        $tx_file .= "idDest_B11a=1\n"; //  Identificador de local de destino da operação: Operação interna
        $tx_file .= "tpImp_B21=4\n"; // Formato de Impressão do DANFE
        $tx_file .= "tpEmis_B22=1\n"; // Tipo de Emissão da NF-e
        // $tx_file .= "cDV_B23=0\n"; // Dígito Verificador da Chave de Acesso da NF-e Campo de preenchimento automático, não é necessário informar.
        $tx_file .= "tpAmb_B24=". $this->environment . "\n"; // Identificação do Ambiente; 1=Produção/2=Homologação
        $tx_file .= "finNFe_B25=1\n"; // Versão do Processo de emissão da NF-e
        $tx_file .= "indFinal_B25a=1\n"; // Indica operação com Consumidor final;0=Normal; 1=Consumidor final;
        $tx_file .= "indPres_B25b=1\n"; // Indicador de presença do comprador no estabelecimento comercial no momento da operação
        $tx_file .= "procEmi_B26=0\n"; // Processo de emissão da NF-e
        $tx_file .= "verProc_B27=SoulPet1.0\n"; // Versão do Processo de emissão da NF-e

        $this->createUnityTx($tx_file, $unity, $city, $province);

        $order = UnityOrder::whereUnity($unity->id)->first();
        if (!$order) {
            return response()->json(['error' => 'unity order not found'], 400);
        }

        $receivable = UnityReceivable::whereOrder($order->id)->first();
        $unity_products = $order->products()->with('product')->get();
        $product_total_value = $this->getTotalProductValue($unity_products);

        foreach ($unity_products as $unity_product) {
            $this->addProductToTx2($tx_file, $unity_product);
        }

        // Informações do pagamento
        $tx_file .= "INCLUIRPARTE=YA\n";
        $tx_file .= "indPag_YA01b=". (!is_null($order->chedule) ? "1" : "0") ."\n"; // @CHECK Forma de Pagamento a vista ou a prazo? se schedule != null é a prazo
        $tx_file .= "tPag_YA02=". $this->getPaymentForm($receivable) . "\n"; // Meio de pagamento
        $tx_file .= "vPag_YA03={$product_total_value}\n"; // Valor do Pagamento
        $tx_file .= "SALVARPARTE=YA\n";

        $tx_file .= "vBC_W03=0.00\n"; // Base de Cálculo do ICMS
        $tx_file .= "vICMS_W04=0.00\n"; // Valor Total do ICMS
        $tx_file .= "vICMSDeson_W04a=0.00\n"; // Valor Total do ICMS desonerado

        $tx_file .= "vFCP_W04h=0.00\n"; // Valor Total do FCP (Fundo de Combate à Pobreza)
        $tx_file .= "vBCST_W05=0.00\n";  //  Base de Cálculo do ICMS ST
        $tx_file .= "vST_W06=0.00\n"; // Valor Total do ICMS ST
        $tx_file .= "vFCPST_W06a=0.00\n"; // Valor Total do FCP (Fundo de Combate à Pobreza) retido por substituição tributária
        $tx_file .= "vFCPSTRet_W06b=0.00\n"; // Valor Total do FCP retido anteriormente por Substituição Tributária
        $tx_file .= "vProd_W07=". $product_total_value ."\n"; // Valor Total dos produtos e serviços
        $tx_file .= "vFrete_W08=0.00\n"; //  Valor Total do Frete
        $tx_file .= "vSeg_W09=0.00\n"; //  Valor Total do Seguro
        $tx_file .= "vDesc_W10=0.00\n"; //  Valor Total do Desconto
        $tx_file .= "vII_W11=0.00\n"; // Valor Total do II
        $tx_file .= "vIPI_W12=0.00\n"; // Valor Total do IPI
        $tx_file .= "vIPIDevol_W12a=0.00\n"; //  Valor Total do IPI Devolvido
        $tx_file .= "vPIS_W13=0.00\n"; // Valor total do PIS
        $tx_file .= "vCOFINS_W14=0.00\n"; // Valor Total do COFINS TODO:
        $tx_file .= "vOutro_W15=0.00\n"; // Valor total de Outras despesas
        $tx_file .= "vNF_W16={$product_total_value}\n"; // Valor Total da NF-e
        $tx_file .= "modFrete_X02=9\n"; // Modalidade do frete. Sem ocorrencia de transporte

        $tx_file .= "CNPJ_ZD02=17651262000119\n"; // CNPJ da pessoa jurídica responsável pelo sistema utilizado na emissão do documento fiscal eletrônico;
        $tx_file .= "xContato_ZD04=7cliques Desenvolvimento e Hospedagem de Site LTDA\n"; // Nome da pessoa a ser contatada.
        $tx_file .= "email_ZD05=ruiz@7cliques.com.br\n"; // E-mail da pessoa jurídica a ser contatada
        $tx_file .= "fone_ZD06=4533034125\n"; // Telefone da pessoa jurídica/física a ser contatada
        $tx_file .= "SALVAR\n";
    }

    protected function getNFSE(&$tx_file)
    {
        $service_total_value = "0.10";

        $tx_file .= "padrao=TecnoNFSe\n";
        $tx_file .= "NomeCidade=FozDoIguacuPR\n";
        $tx_file .= "INCLUIR\n";
        $tx_file .= "NumeroLote=45\n"; // TODO: incrementavel
        $tx_file .= "CPFCNPJRemetente=17651262000119\n";
        $tx_file .= "InscricaoMunicipalRemetente=081871680\n";
        $tx_file .= "ValorTotalServicos={$service_total_value}\n";
        $tx_file .= "ValorTotalDeducoes=0.00\n";
        $tx_file .= "ValorTotalBaseCalculo=0.10\n";
        $tx_file .= "SALVAR\n";
        $tx_file .= "INCLUIRRPS\n";
        $tx_file .= "SituacaoNota=1\n"; // esta como normal
        $tx_file .= "TipoRps=1\n";
        $tx_file .= "SerieRps=F\n";
        $tx_file .= "NumeroRps=0\n"; // TODO: ver se incrementacao esta ativa no saass
        $tx_file .= "DataEmissao=". \Carbon\Carbon::now()->timezone("America/Sao_Paulo")->format("Y-m-d\Th:m:sP") . "\n";
        $tx_file .= "Competencia=2020-03-30\n"; // TODO:  	quando o serviço foi presado
        $tx_file .= "CpfCnpjPrestador=17651262000119\n"; // soulpet
        $tx_file .= "InscricaoMunicipalPrestador=081871680\n"; // TODO: soulpet
        $tx_file .= "RazaoSocialPrestador=PET CRECHE CATARATAS LTDA - ME\n";
        $tx_file .= "InscricaoEstadualPrestador=081871680\n"; // TODO: soulpet
        $tx_file .= "TipoLogradouroPrestador=Avenida\n";
        $tx_file .= "EnderecoPrestador=TANCREDO NEVES\n";
        $tx_file .= "NumeroPrestador=3880\n";
        $tx_file .= "ComplementoPrestador=IMOVEL FOZ DO IGUACU-PARTE II(PORTO BELO)\n";


        $tx_file .= "CodigoCidadePrestador=4108304 \n";
        $tx_file .= "DescricaoCidadePrestador=Foz do Iguaçu\n";
        $tx_file .= "TelefonePrestador=35776337\n";
        $tx_file .= "EmailPrestador=petcrechecataratas@gmail.com\n";
        $tx_file .= "CepPrestador=85867633\n";
        $tx_file .= "OptanteSimplesNacional=1\n";
        $tx_file .= "IncentivadorCultural=2\n";
        $tx_file .= "RegimeEspecialTributacao=1\n";
        $tx_file .= "NaturezaTributacao=1\n"; // deixei como simples nacional
        $tx_file .= "IncentivoFiscal=2\n"; // TODO: checar com contador
        $tx_file .= "TipoTributacao=6\n"; // TODO: checar com contador
        $tx_file .= "ExigibilidadeISS=1\n"; // // TODO: checar com contador
        $tx_file .= "Operacao=A\n"; // TODO: checarcom contador
        $tx_file .= "CodigoItemListaServico=5.08\n"; // TODO: isso é o Item da lista de serviço
        $tx_file .= "CodigoTributacaoMunicipio=5.08\n";// TODO: pegar esse dado !!! talvez seja 9609208
        $tx_file .= "CodigoCnae=9609208\n"; // TODO:// TODO: pegar esse dado !!! codigo atv. ou servico
        $tx_file .= "DiscriminacaoServico=Pacote de banho e tosa para cães.\n"; // TODO: adicionar descricao do servico
        $tx_file .= "MunicipioIncidencia=4108304\n"; // Foz do iguaçu
        $tx_file .= "CodigoCidadePrestacao=4108304\n";
        $tx_file .= "DescricaoCidadePrestacao=Foz do Iguaçu\n";
        $tx_file .= "CpfCnpjTomador=04002391086\n"; // TODO: imagino que seja o cpf/cnpj do cliente
        $tx_file .= "RazaoSocialTomador=TECNOSPEED TECNOLOGIA DA INFORMACAO\n"; // TODO: imagino que seja a razao social do cliente Caso for cpf, colocar nome
        $tx_file .= "InscricaoEstadualTomador=\n"; // TODO:
        $tx_file .= "InscricaoMunicipalTomador=\n"; // TODO:
        $tx_file .= "TipoLogradouroTomador=AVENIDA\n"; // TODO:
        $tx_file .= "EnderecoTomador=AVENIDA DUQUE DE CAXIAS\n"; // TODO:
        $tx_file .= "NumeroTomador=882\n"; // TODO: enderecp
        $tx_file .= "ComplementoTomador=SALA 909\n"; // TODO:
        $tx_file .= "BairroTomador=ZONA 7\n"; // TODO:
        $tx_file .= "CodigoCidadeTomador=4115200\n"; // TODO:
        $tx_file .= "DescricaoCidadeTomador=MARINGA\n"; // TODO:
        $tx_file .= "UfTomador=PR\n"; // TODO:
        $tx_file .= "CepTomador=87050111\n"; // TODO:
        $tx_file .= "PaisTomador=1058\n"; // TODO:
        $tx_file .= "DDDTomador=044\n"; // TODO:
        $tx_file .= "TelefoneTomador=99999999\n"; // TODO:
        $tx_file .= "EmailTomador=teste@tecnospeed.com.br\n"; // TODO:

        // esses estao no arquivo de exemplo, nao com o exato nome: TODO: checar com contador.
        $tx_file .= "AliquotaPIS=0.00\n";
        $tx_file .= "AliquotaCOFINS=0.00\n";
        $tx_file .= "AliquotaINSS=0.00\n";
        $tx_file .= "AliquotaIR=0.00\n";
        $tx_file .= "AliquotaCSLL=0.00\n";

        $tx_file .= "ValorPIS=0.00\n";
        $tx_file .= "ValorCOFINS=0.00\n";
        $tx_file .= "ValorINSS=0.00\n";
        $tx_file .= "ValorIR=0.00\n";
        $tx_file .= "ValorCSLL=0.00\n";

        $tx_file .= "OutrasRetencoes=0.00\n";
        /// TODO: checar com o sistema desconto no carrinho
        $tx_file .= "DescontoIncondicionado=0.00\n";
        $tx_file .= "DescontoCondicionado=0.00\n";
        ///
        $tx_file .= "ValorDeducoes=0.00\n";
        $tx_file .= "AliquotaISS=2.44000\n"; // TODO: cehcar quando vai ter desconto com contador
        $tx_file .= "ValorServicos=$service_total_value\n"; // TODO:

        $tx_file .= "BaseCalculo=$service_total_value\n"; // TODO: cehcar quando vai ter desconto com contador
        $tx_file .= "ValorIss=0.05\n"; // TODO:
        $tx_file .= "IssRetido=2\n"; // TODO: deixei como nao
        $tx_file .= "ValorISSRetido=0.00\n"; // TODO:

        $tx_file .= "ValorLiquidoNfse=$service_total_value\n"; // TODO:
        $tx_file .= "SALVARRPS\n";
    }

    protected function addProductToTx2(&$tx_file, $order_product)
    {
        $product = Product::find($order_product->product);

        $quantity = (int) $order_product->quantity ?? 1;

        $tx_file .= "INCLUIRITEM\n";
        $tx_file .= "nItem_H02=" . $product->id . "\n";

        // GTIN (Global Trade Item Number) do produto, antigo código EAN ou código de barras
        $gtin = is_null($product->ean) ? "SEM GTIN" : $product->ean;
        $tx_file .= "cEAN_I03=" . $gtin . "\n";

        $tx_file .= "cProd_I02=" ."CFOP" . $product->cfop . "\n"; // Código do produto ou serviço

        $tx_file .= "xProd_I04={$product->description}\n";
        // $tx_file .= "xProd_I04=NOTA FISCAL EMITIDA EM AMBIENTE DE HOMOLOGACAO - SEM VALOR FISCAL\n";

        $tx_file .= "CEST_I05c=". $product->cest ."\n"; // Código CEST
        // $tx_file .= "NCM_I05=" . ($product->ncm ?? "12345678") . "\n"; //  Código NCM com 8 digitos
        $tx_file .= "NCM_I05=" . ($product->ncm ?? "02032900") . "\n"; //  Código NCM com 8 digitos TODO: voltar quando tiver ncm no banco

        $product_value = "1.00";

        $tx_file .= "CFOP_I08=" .$product->cfop ."\n"; // precisa checar individualmente cada produto
        $tx_file .= "uCom_I09=" . $product->unity . "\n"; // Unidade
        $tx_file .= "qCom_I10={$quantity}\n"; // Quantidade
        $tx_file .= "vUnCom_I10a=" . $product_value . "\n";
        $tx_file .= "vProd_I11=". $product_value . "\n"; // Valor Total Bruto dos Produtos ou Serviços
        $tx_file .= "cEANTrib_I12={$gtin}\n"; // GTIN (Global Trade Item Number) da unidade tributável, antigo código EAN ou código de barras
        $tx_file .= "uTrib_I13=UN\n"; // Unidade Tributável
        $tx_file .= "qTrib_I14={$quantity}\n"; // Quantidade Tributável
        $tx_file .= "vUnTrib_I14a=" . $product_value . "\n"; // Valor Unitário de tributação
        $tx_file .= "indTot_I17b=1\n"; // Indica se valor do Item (vProd) entra no valor total da NF-e (vProd)
        $tx_file .= "orig_N11=0\n"; // Origem da mercadoria; 0 - Nacional
        $tx_file .= "CSOSN_N12a=102\n";
        $tx_file .= "SALVARITEM\n";
    }

    protected function createUnityTx(&$tx_file, $unity, $city, $province)
    {

        // TODO: adicionar funcionalidade de criar unidade no painel do tecnospeed automaticamente via api

        // 17.651.262/0001-19
        $tx_file .= "CNPJ_C02=" . str_replace(['.','-', '/'], '', $unity->cnpj) . "\n"; // tem que ser esse na versao final
        $tx_file .= "xNome_C03=". $unity->razao_social ."\n"; // Razão Social ou nome do emitente
        $tx_file .= "xFant_C04=" .  $unity->fantasy ."\n";
        $tx_file .= "xLgr_C06=" . $unity->street . "\n";
        $tx_file .= "nro_C07=" . $unity->number . "\n";
        $tx_file .= "xBairro_C09=" . $unity->district . "\n";
        $tx_file .= "cMun_C10=4108304\n"; // Código do município
        $tx_file .= "xMun_C11=". $city->name ."\n"; // Nome do municipio
        $tx_file .= "UF_C12=" . $province->initials . "\n";
        $tx_file .= "CEP_C13=" . str_replace(['-'], '', $unity->zipcode) . "\n";

        /*
        TOKEN CSC (produção?) H9WR393QED1HGS45XNSCIMCOTP4CRAKBCPSS

        */

        $tx_file .= "cPais_C14=1058\n";
        $tx_file .= "xPais_C15=BRASIL\n";

        // Indicador da IE do Destinatário: 9=Não Contribuinte, que pode ou não possuir Inscrição Estadual no Cadastro de Contribuintes do ICMS.
        $tx_file .= "indIEDest_E16a=9\n";

        $tx_file .= "IE_C17=9074772312\n"; // Inscrição Estadual do Emitente. NFC-e não deve informar IE de Substituto Tributário. @CHECK
        $tx_file .= "IEST_C18=\n"; // IE do Substituto Tributário @CHECK
        $tx_file .= "CRT_C21=1\n"; // Código do Regime Tribtário;  3=Regime Normal.

    }

    protected function getPaymentForm($receivable)
    {
        /*
        TODO:
        01=Dinheiro
        02=Cheque
        03=Cartão de Crédito
        04=Cartão de Débito
        05=Crédito Loja
        10=Vale Alimentação
        11=Vale Refeição
        12=Vale Presente
        13=Vale Combustível
        14=Duplicata Mercantil
        15=Boleto Bancário
        90= Sem pagamento
        99=Outros
        */

        $payment_form = null;

        switch ($receivable->payment_with) {
            case 'CHEQUE':
                $payment_form = "02";
                break;
            default:
                abort(400, "não foi possivel identificar o tipo de pagamento");
        }

        return $payment_form;

    }

    protected function getTotalProductValue($unity_products)
    {
        $total = 0;

        foreach ($unity_products as $order_product) {
            $product = Product::find($order_product->product);
            $total += number_format($product->price_sale * $order_product->quantity, 2);
        }

        return $total;
    }

    protected function getRequestConfigs()
    {
        return [
            'headers' => [
                'Authorization' => 'Basic YWRtaW46MTIzbXVkYXI=',
                'Content-type' => 'application/x-www-form-urlencoded'
            ]
        ];
    }
}
