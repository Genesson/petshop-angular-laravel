import {ProductProviderModel} from '../../../shared/models/product-provider.model';

export class SelectProductProvider {
  static readonly type = '[Products] Select Product Provider Success';

  constructor(public payload: ProductProviderModel) {
  }
}

export class LoadProductProviders {
  static readonly type = '[Products] Load Product Providers';
}

export class LoadProductProvidersSuccess {
  static readonly type = '[Products] Load Product Providers Success';

  constructor(public payload: ProductProviderModel[]) {
  }
}

export class LoadProductProvidersFail {
  static readonly type = '[Products] Load Products Providers Fail';

  constructor(public payload: any) {
  }
}

export class CreateProductProvider {
  static readonly type = '[Products] Create Product Provider';

  constructor(public payload: ProductProviderModel) {
  }
}

export class CreateProductProviderSuccess {
  static readonly type = '[Products] Create Product Provider Success';

  constructor(public payload: ProductProviderModel) {
  }
}

export class CreateProductProviderFail {
  static readonly type = '[Products] Create Product Provider Fail';

  constructor(public payload: any) {
  }
}

export class UpdateProductProvider {
  static readonly type = '[Products] Update Product Provider';

  constructor(public payload: ProductProviderModel) {
  }
}

export class UpdateProductProviderSuccess {
  static readonly type = '[Products] Update Product Provider Success';

  constructor(public payload: ProductProviderModel) {
  }
}

export class UpdateProductProviderFail {
  static readonly type = '[Products] Update Product Provider Fail';

  constructor(public payload: any) {
  }
}

export class DeleteProductProvider {
  static readonly type = '[Products] Delete Product Provider';

  constructor(public payload: ProductProviderModel) {
  }
}

export class DeleteProductProviderSuccess {
  static readonly type = '[Products] Delete Product Provider Success';

  constructor(public payload: ProductProviderModel) {
  }
}

export class DeleteProductProviderFail {
  static readonly type = '[Products] Delete Product Provider Fail';

  constructor(public payload: any) {
  }
}

export class UploadCsvProductProvider {
  static readonly type = '[ProductProviders] Upload Csv ProductProvider';

  constructor(public payload: FormData) {
  }
}

export class UploadCsvProductProviderSuccess {
  static readonly type = '[ProductProviders] Upload Csv ProductProvider Success';

  constructor(public payload: any[]) {
  }
}

export class UploadCsvProductProviderFail {
  static readonly type = '[ProductProviders] Upload Csv ProductProvider Fail';

  constructor(public payload: any) {
  }
}

export class UploadCsvProductProductProvider {
  static readonly type = '[ProductProductProviders] Upload Csv ProductProvider';

  constructor(public payload: FormData) {
  }
}

export class UploadCsvProductProductProviderSuccess {
  static readonly type = '[ProductProductProviders] Upload Csv ProductProductProvider Success';

  constructor(public payload: any[]) {
  }
}

export class UploadCsvProductProductProviderFail {
  static readonly type = '[ProductProductProviders] Upload Csv ProductProductProvider Fail';

  constructor(public payload: any) {
  }
}
