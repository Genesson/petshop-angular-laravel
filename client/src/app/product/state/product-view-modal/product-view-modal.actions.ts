import {ProductModel} from '../../../shared/models/product.model';

export class OpenProductViewModal {
    static readonly type = '[Products] Open Product View Modal';

    constructor(public payload: ProductModel) {
    }
}

export class CloseProductViewModal {
    static readonly type = '[Products] Close Product View Modal';
}

