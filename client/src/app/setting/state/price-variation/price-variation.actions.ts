import {PriceVariationModel} from '../../../shared/models/price-variation.model';

export class SelectPriceVariation {
    static readonly type = '[PriceVariations] Select PriceVariation Success';

    constructor(public payload: PriceVariationModel) {
    }
}

export class LoadPriceVariations {
    static readonly type = '[PriceVariations] Load PriceVariations';
}

export class LoadPriceVariationsSuccess {
    static readonly type = '[PriceVariations] Load PriceVariations Success';

    constructor(public payload: PriceVariationModel[]) {
    }
}

export class LoadPriceVariationsFail {
    static readonly type = '[PriceVariations] Load PriceVariations Fail';

    constructor(public payload: any) {
    }
}

export class CreatePriceVariation {
    static readonly type = '[PriceVariations] Create PriceVariation';

    constructor(public payload: PriceVariationModel) {
    }
}

export class CreatePriceVariationSuccess {
    static readonly type = '[PriceVariations] Create PriceVariation Success';

    constructor(public payload: PriceVariationModel) {
    }
}

export class CreatePriceVariationFail {
    static readonly type = '[PriceVariations] Create PriceVariation Fail';

    constructor(public payload: any) {
    }
}

export class UpdatePriceVariation {
    static readonly type = '[PriceVariations] Update PriceVariation';

    constructor(public payload: PriceVariationModel) {
    }
}

export class UpdatePriceVariationSuccess {
    static readonly type = '[PriceVariations] Update PriceVariation Success';

    constructor(public payload: PriceVariationModel) {
    }
}

export class UpdatePriceVariationFail {
    static readonly type = '[PriceVariations] Update PriceVariation Fail';

    constructor(public payload: any) {
    }
}

export class DeletePriceVariation {
    static readonly type = '[PriceVariations] Delete PriceVariation';

    constructor(public payload: PriceVariationModel) {
    }
}

export class DeletePriceVariationSuccess {
    static readonly type = '[PriceVariations] Delete PriceVariation Success';

    constructor(public payload: PriceVariationModel) {
    }
}

export class DeletePriceVariationFail {
    static readonly type = '[PriceVariations] Delete PriceVariation Fail';

    constructor(public payload: any) {
    }
}
