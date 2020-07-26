import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
  SelectProductCategory,
  LoadProductCategories,
  LoadProductCategoriesSuccess,
  LoadProductCategoriesFail,
  CreateProductCategory,
  CreateProductCategorySuccess,
  CreateProductCategoryFail,
  UpdateProductCategory,
  UpdateProductCategorySuccess,
  UpdateProductCategoryFail,
  DeleteProductCategory,
  DeleteProductCategorySuccess,
  DeleteProductCategoryFail
} from './product-category.actions';
import {CloseProductCategoryModal } from '../product-category-modal/product-category-modal.actions';

import {ProductCategoryModel} from '../../../shared/models/product-category.model';

import {ProductCategoryResource} from '../../../shared/resources/product-category.resource';

export class ProductCategoryStateModel extends NgxsEntityStateStateModel<ProductCategoryModel> {
  isLoading: boolean;
}

@State<ProductCategoryStateModel>({
  name: 'productCategory',
  defaults: {
    ids: [],
    entities: {},
    selected: null,
    isLoading: false
  }
})
@Injectable()
export class ProductCategoryState {

    @Selector()
    static selected(state: ProductCategoryStateModel) {
      return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: ProductCategoryStateModel) {
      return state.isLoading;
    }

    @Selector()
    static entities(state: ProductCategoryStateModel) {
      return state.entities;
    }

    constructor(private productCategoryResource: ProductCategoryResource,
                private toastController: ToastController) {
    }

    @Action(SelectProductCategory)
    selectProductCategory(ctx: StateContext<ProductCategoryStateModel>, {payload}: SelectProductCategory) {
      NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadProductCategories)
    loadProductCategories(ctx: StateContext<ProductCategoryStateModel>) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.productCategoryResource.find().pipe(
        map((ProductCategory: ProductCategoryModel[]) => ctx.dispatch(new LoadProductCategoriesSuccess(ProductCategory))),
        catchError((error) => ctx.dispatch(new LoadProductCategoriesFail(error)))
      );
    }

    @Action(LoadProductCategoriesSuccess)
    loadProductCategoriesSuccess(ctx: StateContext<ProductCategoryStateModel>, {payload}: LoadProductCategoriesSuccess) {
      NgxsEntityStateAdapter.addAll(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadProductCategoriesFail)
    loadProductCategoriesFail(ctx: StateContext<ProductCategoryStateModel>, {payload}: LoadProductCategoriesFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateProductCategory)
    createProductCategory(ctx: StateContext<ProductCategoryStateModel>, action: CreateProductCategory) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.productCategoryResource.create(action.payload).pipe(
        map((ProductCategory: ProductCategoryModel) => ctx.dispatch(new CreateProductCategorySuccess(ProductCategory))),
        catchError((error) => ctx.dispatch(new CreateProductCategoryFail(error)))
      );
    }

    @Action(CreateProductCategorySuccess)
    createProductCategorySuccess(ctx: StateContext<ProductCategoryStateModel>, {payload}: CreateProductCategorySuccess) {
      NgxsEntityStateAdapter.addOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Categoria cadastrada com sucesso!');
      ctx.dispatch(new SelectProductCategory(payload));
      ctx.dispatch(new CloseProductCategoryModal());
    }

    @Action(CreateProductCategoryFail)
    createProductCategoryFail(ctx: StateContext<ProductCategoryStateModel>, {payload}: CreateProductCategoryFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateProductCategory)
    updateProductCategory(ctx: StateContext<ProductCategoryStateModel>, action: UpdateProductCategory) {
      ctx.patchState({isLoading: true});
      return this.productCategoryResource.update(action.payload).pipe(
        map((ProductCategory: ProductCategoryModel) => ctx.dispatch(new UpdateProductCategorySuccess(ProductCategory))),
        catchError((error) => ctx.dispatch(new UpdateProductCategoryFail(error)))
      );
    }

    @Action(UpdateProductCategorySuccess)
    updateProductCategorySuccess(ctx: StateContext<ProductCategoryStateModel>, {payload}: UpdateProductCategorySuccess) {
      NgxsEntityStateAdapter.updateOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Categoria atualizada com sucesso!');
      ctx.dispatch(new CloseProductCategoryModal());
    }

    @Action(UpdateProductCategoryFail)
    updateProductCategoryFail(ctx: StateContext<ProductCategoryStateModel>, {payload}: UpdateProductCategoryFail) {
      this.presentToast(payload.error.message, 'danger');
      NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteProductCategory)
    deleteProductCategory(ctx: StateContext<ProductCategoryStateModel>, action: DeleteProductCategory) {
      NgxsEntityStateAdapter.startLoading(ctx);
      return this.productCategoryResource.destroy(action.payload).pipe(
        map((ProductCategory: ProductCategoryModel) => ctx.dispatch(new DeleteProductCategorySuccess(ProductCategory))),
        catchError((error) => ctx.dispatch(new DeleteProductCategoryFail(error)))
      );
    }

    @Action(DeleteProductCategorySuccess)
    deleteProductCategorySuccess(ctx: StateContext<ProductCategoryStateModel>, {payload}: DeleteProductCategorySuccess) {
      NgxsEntityStateAdapter.removeOne(payload, ctx);
      NgxsEntityStateAdapter.stopLoading(ctx);
      this.presentToast('Categoria excluída com sucesso!');
    }

    @Action(DeleteProductCategoryFail)
    deleteProductCategoryFail(ctx: StateContext<ProductCategoryStateModel>, {payload}: DeleteProductCategoryFail) {
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
}
