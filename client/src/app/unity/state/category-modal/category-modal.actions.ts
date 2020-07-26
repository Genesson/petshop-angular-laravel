import {CategoryModel} from '../../../shared/models/category.model';

export class OpenCategoryModal {
    static readonly type = '[Units] Open Category Modal';

    constructor(public payload: { editing: boolean, data?: CategoryModel }) {
    }
}

export class CloseCategoryModal {
    static readonly type = '[Units] Close Category Modal';
}

