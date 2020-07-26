import { ProductCategoryModel } from './../../../shared/models/product-category.model';

export class OpenProductCategoryModal {
    static readonly type = '[Products] Open Product Category Modal';

    constructor(public payload: { editing: boolean, data?: ProductCategoryModel }) {
    }
}

export class CloseProductCategoryModal {
    static readonly type = '[Products] Close Product Category Modal';
}

