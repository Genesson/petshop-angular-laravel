import {PriceVariationModel} from '../../../shared/models/price-variation.model';

export class OpenPriceVariationModal {
    static readonly type = '[PriceVariations] Open PriceVariation Modal';

    constructor(public payload: { editing: boolean, data?: PriceVariationModel }) {
    }
}

export class ClosePriceVariationModal {
    static readonly type = '[PriceVariations] Close PriceVariation Modal';
}

