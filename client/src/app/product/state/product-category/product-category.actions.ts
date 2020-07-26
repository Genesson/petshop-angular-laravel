import {ProductCategoryModel} from '../../../shared/models/product-category.model';

export class SelectProductCategory {
  static readonly type = '[Products] Select Product Category Success';

  constructor(public payload: ProductCategoryModel) {
  }
}

export class LoadProductCategories {
  static readonly type = '[Products] Load Product Categories';
}

export class LoadProductCategoriesSuccess {
  static readonly type = '[Products] Load Product Categories Success';

  constructor(public payload: ProductCategoryModel[]) {
  }
}

export class LoadProductCategoriesFail {
  static readonly type = '[Products] Load Products Categories Fail';

  constructor(public payload: any) {
  }
}

export class CreateProductCategory {
  static readonly type = '[Products] Create Product Category';

  constructor(public payload: ProductCategoryModel) {
  }
}

export class CreateProductCategorySuccess {
  static readonly type = '[Products] Create Product Category Success';

  constructor(public payload: ProductCategoryModel) {
  }
}

export class CreateProductCategoryFail {
  static readonly type = '[Products] Create Product Category Fail';

  constructor(public payload: any) {
  }
}

export class UpdateProductCategory {
  static readonly type = '[Products] Update Product Category';

  constructor(public payload: ProductCategoryModel) {
  }
}

export class UpdateProductCategorySuccess {
  static readonly type = '[Products] Update Product Category Success';

  constructor(public payload: ProductCategoryModel) {
  }
}

export class UpdateProductCategoryFail {
  static readonly type = '[Products] Update Product Category Fail';

  constructor(public payload: any) {
  }
}

export class DeleteProductCategory {
  static readonly type = '[Products] Delete Product Category';

  constructor(public payload: ProductCategoryModel) {
  }
}

export class DeleteProductCategorySuccess {
  static readonly type = '[Products] Delete Product Category Success';

  constructor(public payload: ProductCategoryModel) {
  }
}

export class DeleteProductCategoryFail {
  static readonly type = '[Products] Delete Product Category Fail';

  constructor(public payload: any) {
  }
}
