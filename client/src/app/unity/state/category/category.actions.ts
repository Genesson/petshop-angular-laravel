import {CategoryModel} from '../../../shared/models/category.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectCategory {
    static readonly type = '[Categories] Select Category';

    constructor(public payload: CategoryModel) {
    }
}

export class LoadCategories {
    static readonly type = '[Categories] Load Categories';
}

export class LoadCategoriesSuccess {
    static readonly type = '[Categories] Load Categories Success';

    constructor(public payload: CategoryModel[]) {
    }
}

export class LoadCategoriesFail {
    static readonly type = '[Categories] Load Categories Fail';

    constructor(public payload: any) {
    }
}

export class LoadCategoriesUnity {
    static readonly type = '[Categories] Load Categories Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadCategoriesUnitySuccess {
    static readonly type = '[Categories] Load Categories Unity Success';

    constructor(public payload: CategoryModel[]) {
    }
}

export class LoadCategoriesUnityFail {
    static readonly type = '[Categories] Load Categories Unity Fail';

    constructor(public payload: any) {
    }
}

export class CreateCategory {
    static readonly type = '[Categories] Create Category';

    constructor(public payload: CategoryModel) {
    }
}

export class CreateCategorySuccess {
    static readonly type = '[Categories] Create Category Success';

    constructor(public payload: CategoryModel) {
    }
}

export class CreateCategoryFail {
    static readonly type = '[Categories] Create Category Fail';

    constructor(public payload: any) {
    }
}

export class UpdateCategory {
    static readonly type = '[Categories] Update Category';

    constructor(public payload: CategoryModel) {
    }
}

export class UpdateCategorySuccess {
    static readonly type = '[Categories] Update Category Success';

    constructor(public payload: CategoryModel) {
    }
}

export class UpdateCategoryFail {
    static readonly type = '[Categories] Update Category Fail';

    constructor(public payload: any) {
    }
}

export class DeleteCategory {
    static readonly type = '[Categories] Delete Category';

    constructor(public payload: CategoryModel) {
    }
}

export class DeleteCategorySuccess {
    static readonly type = '[Categories] Delete Category Success';

    constructor(public payload: CategoryModel) {
    }
}

export class DeleteCategoryFail {
    static readonly type = '[Categories] Delete Category Fail';

    constructor(public payload: any) {
    }
}
