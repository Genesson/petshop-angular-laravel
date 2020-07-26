import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
  CreateProduct,
  CreateProductFail,
  CreateProductSuccess,
  DeleteProduct,
  DeleteProductFail,
  DeleteProductSuccess,
  LoadProducts,
  LoadProductsFail,
  LoadProductsSuccess,
  SelectProduct,
  UpdateProduct,
  UpdateProductFail,
  UpdateProductSuccess,
  UploadCsvProduct,
  UploadCsvProductFail,
  UploadCsvProductSuccess,
  UploadImageProduct,
  UploadImageProductFail,
  UploadImageProductSuccess
} from './product.actions';
import {CloseProductModal} from '../product-modal/product-modal.actions';

import {ProductModel} from '../../../shared/models/product.model';

import {ProductResource} from '../../../shared/resources/product.resource';
import {
  UploadCsvProductProductProvider,
  UploadCsvProductProductProviderFail,
  UploadCsvProductProductProviderSuccess
} from '../product-provider/product-provider.actions';

export class ProductStateModel extends NgxsEntityStateStateModel<ProductModel> {
  image: string;
  isLoadingImage: boolean;
  isLoadingProductCsv: boolean;
  isLoading: boolean;
  isLoadingProductProductProviderCsv: boolean;
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    ids: [],
    entities: {},
    selected: null,
    image: null,
    isLoadingProductProductProviderCsv: false,
    isLoadingProductCsv: false,
    isLoadingImage: false,
    isLoading: false
  }
})
@Injectable()
export class ProductState {

  @Selector()
  static selected(state: ProductStateModel) {
    return state.entities[state.selected.id];
  }

  @Selector()
  static isLoading(state: ProductStateModel) {
    return state.isLoading;
  }

  @Selector()
  static isLoadingImage(state: ProductStateModel) {
    return state.isLoadingImage;
  }


  @Selector()
  static entities(state: ProductStateModel) {
    return state.entities;
  }

  @Selector()
  static image(state: ProductStateModel) {
    return state.image;
  }

  @Selector()
  static isLoadingProductCsv(state: ProductStateModel) {
    return state.isLoadingProductCsv;
  }

  @Selector()
  static isLoadingProductProductProviderCsv(state: ProductStateModel) {
    return state.isLoadingProductProductProviderCsv;
  }

  constructor(private productResource: ProductResource,
              private toastController: ToastController) {
  }

  @Action(SelectProduct)
  selectProduct(ctx: StateContext<ProductStateModel>, {payload}: SelectProduct) {
    NgxsEntityStateAdapter.select(payload, ctx);
  }

  @Action(LoadProducts)
  loadProducts(ctx: StateContext<ProductStateModel>) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.productResource.find().pipe(
      map((Product: ProductModel[]) => ctx.dispatch(new LoadProductsSuccess(Product))),
      catchError((error) => ctx.dispatch(new LoadProductsFail(error)))
    );
  }

  @Action(LoadProductsSuccess)
  loadProductsSuccess(ctx: StateContext<ProductStateModel>, {payload}: LoadProductsSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(LoadProductsFail)
  loadProductsFail(ctx: StateContext<ProductStateModel>, {payload}: LoadProductsFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(CreateProduct)
  createProduct(ctx: StateContext<ProductStateModel>, action: CreateProduct) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.productResource.create(action.payload).pipe(
      map((Product: ProductModel) => ctx.dispatch(new CreateProductSuccess(Product))),
      catchError((error) => ctx.dispatch(new CreateProductFail(error)))
    );
  }

  @Action(CreateProductSuccess)
  createProductSuccess(ctx: StateContext<ProductStateModel>, {payload}: CreateProductSuccess) {
    NgxsEntityStateAdapter.addOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Produto cadastrado com sucesso!');
    ctx.dispatch(new SelectProduct(payload));
    ctx.dispatch(new CloseProductModal());
  }

  @Action(CreateProductFail)
  createProductFail(ctx: StateContext<ProductStateModel>, {payload}: CreateProductFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(UpdateProduct)
  updateProduct(ctx: StateContext<ProductStateModel>, action: UpdateProduct) {
    ctx.patchState({isLoading: true});
    return this.productResource.update(action.payload).pipe(
      map((Product: ProductModel) => ctx.dispatch(new UpdateProductSuccess(Product))),
      catchError((error) => ctx.dispatch(new UpdateProductFail(error)))
    );
  }

  @Action(UpdateProductSuccess)
  updateProductSuccess(ctx: StateContext<ProductStateModel>, {payload}: UpdateProductSuccess) {
    NgxsEntityStateAdapter.updateOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Produto atualizado com sucesso!');
    ctx.dispatch(new CloseProductModal());
  }

  @Action(UpdateProductFail)
  updateProductFail(ctx: StateContext<ProductStateModel>, {payload}: UpdateProductFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(DeleteProduct)
  deleteProduct(ctx: StateContext<ProductStateModel>, action: DeleteProduct) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.productResource.destroy(action.payload).pipe(
      map((Product: ProductModel) => ctx.dispatch(new DeleteProductSuccess(Product))),
      catchError((error) => ctx.dispatch(new DeleteProductFail(error)))
    );
  }

  @Action(DeleteProductSuccess)
  deleteProductSuccess(ctx: StateContext<ProductStateModel>, {payload}: DeleteProductSuccess) {
    NgxsEntityStateAdapter.removeOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Produto excluído com sucesso!');
  }

  @Action(DeleteProductFail)
  deleteProductFail(ctx: StateContext<ProductStateModel>, {payload}: DeleteProductFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(UploadImageProduct)
  uploadImageTutor(ctx: StateContext<ProductStateModel>, action: UploadImageProduct) {
    ctx.patchState({isLoadingImage: true});
    return this.productResource.uploadImage(action.payload).pipe(
      map((image: any) => ctx.dispatch(new UploadImageProductSuccess(image))),
      catchError((error) => ctx.dispatch(new UploadImageProductFail(error)))
    );
  }

  @Action(UploadImageProductSuccess)
  uploadImageTutorSuccess(ctx: StateContext<ProductStateModel>, {payload}: UploadImageProductSuccess) {
    ctx.patchState({image: payload});
    ctx.patchState({isLoadingImage: false});
  }

  @Action(UploadImageProductFail)
  uploadImageTutorFail(ctx: StateContext<ProductStateModel>, {payload}: UploadImageProductFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingImage: false});
  }

  async presentToast(msg, type: string = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: type
    });
    toast.present();
  }

  @Action(UploadCsvProduct)
  uploadCsvProduct(ctx: StateContext<ProductStateModel>, action: UploadCsvProduct) {
    ctx.patchState({isLoadingProductCsv: true});
    return this.productResource.uploadProductCsv(action.payload).pipe(
      map((Product: ProductModel[]) => ctx.dispatch(new UploadCsvProductSuccess(Product))),
      catchError((error) => ctx.dispatch(new UploadCsvProductFail(error))),
    );
  }

  @Action(UploadCsvProductSuccess)
  uploadCsvProductSuccess(ctx: StateContext<ProductStateModel>, {payload}: UploadCsvProductSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    ctx.patchState({isLoadingProductCsv: false});
    this.presentToast('Importação finalizada com sucesso!');
  }

  @Action(UploadCsvProductFail)
  uploadCsvProductFail(ctx: StateContext<ProductStateModel>, {payload}: UploadCsvProductFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingProductCsv: false});
  }

  @Action(UploadCsvProductProductProvider)
  uploadCsvProductProductProvider(ctx: StateContext<ProductStateModel>, action: UploadCsvProduct) {
    ctx.patchState({isLoadingProductProductProviderCsv: true});
    return this.productResource.uploadProductProductProviderCsv(action.payload).pipe(
      map((Product: ProductModel[]) => ctx.dispatch(new UploadCsvProductProductProviderSuccess(Product))),
      catchError((error) => ctx.dispatch(new UploadCsvProductProductProviderFail(error))),
    );
  }

  @Action(UploadCsvProductProductProviderSuccess)
  uploadCsvProductProductProviderSuccess(ctx: StateContext<ProductStateModel>, {payload}: UploadCsvProductProductProviderSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    ctx.patchState({isLoadingProductProductProviderCsv: false});
    this.presentToast('Importação finalizada com sucesso!');
  }

  @Action(UploadCsvProductProductProviderFail)
  uploadCsvProductProductProviderFail(ctx: StateContext<ProductStateModel>, {payload}: UploadCsvProductProductProviderFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingProductProductProviderCsv: false});
  }
}
