import { ProductProviderModel } from './../../../shared/models/product-provider.model';

export class OpenProductProviderModal {
    static readonly type = '[Products] Open Product Provider Modal';

    constructor(public payload: { editing: boolean, data?: ProductProviderModel }) {
    }
}

export class CloseProductProviderModal {
    static readonly type = '[Products] Close Product Provider Modal';
}

