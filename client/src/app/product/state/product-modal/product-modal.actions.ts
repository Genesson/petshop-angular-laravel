import {ProductModel} from '../../../shared/models/product.model';

export class OpenProductModal {
    static readonly type = '[Products] Open Product Modal';

    constructor(public payload: { editing: boolean, data?: ProductModel }) {
    }
}

export class CloseProductModal {
    static readonly type = '[Products] Close Product Modal';
}

