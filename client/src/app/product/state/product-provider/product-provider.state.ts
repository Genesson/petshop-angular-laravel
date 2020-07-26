import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
  CreateProductProvider,
  CreateProductProviderFail,
  CreateProductProviderSuccess,
  DeleteProductProvider,
  DeleteProductProviderFail,
  DeleteProductProviderSuccess,
  LoadProductProviders,
  LoadProductProvidersFail,
  LoadProductProvidersSuccess,
  SelectProductProvider,
  UpdateProductProvider,
  UpdateProductProviderFail,
  UpdateProductProviderSuccess,
  UploadCsvProductProvider,
  UploadCsvProductProviderFail,
  UploadCsvProductProviderSuccess
} from './product-provider.actions';
import {CloseProductProviderModal} from '../product-provider-modal/product-provider-modal.actions';

import {ProductProviderModel} from '../../../shared/models/product-provider.model';

import {ProductProviderResource} from '../../../shared/resources/product-provider.resource';

export class ProductProviderStateModel extends NgxsEntityStateStateModel<ProductProviderModel> {
  isLoadingProductProviderCsv: boolean;
  isLoading: boolean;
}

@State<ProductProviderStateModel>({
  name: 'productProvider',
  defaults: {
    ids: [],
    entities: {},
    selected: null,
    isLoading: false,
    isLoadingProductProviderCsv: false
  }
})
@Injectable()
export class ProductProviderState {

  @Selector()
  static selected(state: ProductProviderStateModel) {
    return state.entities[state.selected.id];
  }

  @Selector()
  static isLoading(state: ProductProviderStateModel) {
    return state.isLoading;
  }

  @Selector()
  static entities(state: ProductProviderStateModel) {
    return state.entities;
  }

  constructor(private productProviderResource: ProductProviderResource,
              private toastController: ToastController) {
  }

  @Action(SelectProductProvider)
  selectProductProvider(ctx: StateContext<ProductProviderStateModel>, {payload}: SelectProductProvider) {
    NgxsEntityStateAdapter.select(payload, ctx);
  }

  @Action(LoadProductProviders)
  loadProductProviders(ctx: StateContext<ProductProviderStateModel>) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.productProviderResource.find().pipe(
      map((ProductProvider: ProductProviderModel[]) => ctx.dispatch(new LoadProductProvidersSuccess(ProductProvider))),
      catchError((error) => ctx.dispatch(new LoadProductProvidersFail(error)))
    );
  }

  @Action(LoadProductProvidersSuccess)
  loadProductProvidersSuccess(ctx: StateContext<ProductProviderStateModel>, {payload}: LoadProductProvidersSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(LoadProductProvidersFail)
  loadProductProvidersFail(ctx: StateContext<ProductProviderStateModel>, {payload}: LoadProductProvidersFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(CreateProductProvider)
  createProductProvider(ctx: StateContext<ProductProviderStateModel>, action: CreateProductProvider) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.productProviderResource.create(action.payload).pipe(
      map((ProductProvider: ProductProviderModel) => ctx.dispatch(new CreateProductProviderSuccess(ProductProvider))),
      catchError((error) => ctx.dispatch(new CreateProductProviderFail(error)))
    );
  }

  @Action(CreateProductProviderSuccess)
  createProductProviderSuccess(ctx: StateContext<ProductProviderStateModel>, {payload}: CreateProductProviderSuccess) {
    NgxsEntityStateAdapter.addOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Fornecedor cadastrado com sucesso!');
    ctx.dispatch(new SelectProductProvider(payload));
    ctx.dispatch(new CloseProductProviderModal());
  }

  @Action(CreateProductProviderFail)
  createProductProviderFail(ctx: StateContext<ProductProviderStateModel>, {payload}: CreateProductProviderFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(UpdateProductProvider)
  updateProductProvider(ctx: StateContext<ProductProviderStateModel>, action: UpdateProductProvider) {
    ctx.patchState({isLoading: true});
    return this.productProviderResource.update(action.payload).pipe(
      map((ProductProvider: ProductProviderModel) => ctx.dispatch(new UpdateProductProviderSuccess(ProductProvider))),
      catchError((error) => ctx.dispatch(new UpdateProductProviderFail(error)))
    );
  }

  @Action(UpdateProductProviderSuccess)
  updateProductProviderSuccess(ctx: StateContext<ProductProviderStateModel>, {payload}: UpdateProductProviderSuccess) {
    NgxsEntityStateAdapter.updateOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Fornecedor atualizado com sucesso!');
    ctx.dispatch(new CloseProductProviderModal());
  }

  @Action(UpdateProductProviderFail)
  updateProductProviderFail(ctx: StateContext<ProductProviderStateModel>, {payload}: UpdateProductProviderFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  @Action(DeleteProductProvider)
  deleteProductProvider(ctx: StateContext<ProductProviderStateModel>, action: DeleteProductProvider) {
    NgxsEntityStateAdapter.startLoading(ctx);
    return this.productProviderResource.destroy(action.payload).pipe(
      map((ProductProvider: ProductProviderModel) => ctx.dispatch(new DeleteProductProviderSuccess(ProductProvider))),
      catchError((error) => ctx.dispatch(new DeleteProductProviderFail(error)))
    );
  }

  @Action(DeleteProductProviderSuccess)
  deleteProductProviderSuccess(ctx: StateContext<ProductProviderStateModel>, {payload}: DeleteProductProviderSuccess) {
    NgxsEntityStateAdapter.removeOne(payload, ctx);
    NgxsEntityStateAdapter.stopLoading(ctx);
    this.presentToast('Fornecedor excluído com sucesso!');
  }

  @Action(DeleteProductProviderFail)
  deleteProductProviderFail(ctx: StateContext<ProductProviderStateModel>, {payload}: DeleteProductProviderFail) {
    this.presentToast(payload.error.message, 'danger');
    NgxsEntityStateAdapter.stopLoading(ctx);
  }

  async presentToast(msg, type: string = 'success') {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      color: type
    });
    toast.present();
  }

  @Selector()
  static isLoadingProductProviderCsv(state: ProductProviderStateModel) {
    return state.isLoadingProductProviderCsv;
  }

  @Action(UploadCsvProductProvider)
  uploadCsvProductProvider(ctx: StateContext<ProductProviderStateModel>, action: UploadCsvProductProvider) {
    ctx.patchState({isLoadingProductProviderCsv: true});
    return this.productProviderResource.uploadProductProviderCsv(action.payload).pipe(
      map((ProductProvider: ProductProviderModel[]) => ctx.dispatch(new UploadCsvProductProviderSuccess(ProductProvider))),
      catchError((error) => ctx.dispatch(new UploadCsvProductProviderFail(error))),
    );
  }

  @Action(UploadCsvProductProviderSuccess)
  uploadCsvProductProviderSuccess(ctx: StateContext<ProductProviderStateModel>, {payload}: UploadCsvProductProviderSuccess) {
    NgxsEntityStateAdapter.addAll(payload, ctx);
    ctx.patchState({isLoadingProductProviderCsv: false});
    this.presentToast('Importação finalizada com sucesso!');
  }

  @Action(UploadCsvProductProviderFail)
  uploadCsvProductProviderFail(ctx: StateContext<ProductProviderStateModel>, {payload}: UploadCsvProductProviderFail) {
    this.presentToast(payload.error.message, 'danger');
    ctx.patchState({isLoadingProductProviderCsv: false});
  }
}
