import {NfeModel} from './nfe.model';
import {ProviderModel} from './provider.model';
import {ProductXmlModel} from './product-xml.model';
import {PaymentModel} from './payment.model';

export interface XmlModel {
    id?: number;
    nfe: NfeModel;
    provider: ProviderModel;
    products: ProductXmlModel[];
    payments: PaymentModel[];
}
