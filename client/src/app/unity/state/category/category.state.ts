import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectCategory,
    LoadCategories,
    LoadCategoriesSuccess,
    LoadCategoriesFail,
    LoadCategoriesUnity,
    LoadCategoriesUnitySuccess,
    LoadCategoriesUnityFail,
    CreateCategory,
    CreateCategorySuccess,
    CreateCategoryFail,
    UpdateCategory,
    UpdateCategorySuccess,
    UpdateCategoryFail,
    DeleteCategory,
    DeleteCategorySuccess,
    DeleteCategoryFail
} from './category.actions';
import {CloseCategoryModal} from '../category-modal/category-modal.actions';
import {Refresh} from '../../../auth/state/signin/signin.actions';

import {CategoryModel} from '../../../shared/models/category.model';

import {CategoryResource} from '../../../shared/resources/category.resource';

export class CategoryStateModel extends NgxsEntityStateStateModel<CategoryModel> {
    isLoading: boolean;
}

@State<CategoryStateModel>({
    name: 'category',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class CategoryState {

    @Selector()
    static selected(state: CategoryStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: CategoryStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: CategoryStateModel) {
        return state.entities;
    }

    constructor(private categoryResource: CategoryResource,
                private toastController: ToastController) {
    }

    @Action(SelectCategory)
    selectPaciente(ctx: StateContext<CategoryStateModel>, {payload}: SelectCategory) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadCategories)
    loadCategories(ctx: StateContext<CategoryStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.categoryResource.find().pipe(
            map((Category: CategoryModel[]) => ctx.dispatch(new LoadCategoriesSuccess(Category))),
            catchError((error) => ctx.dispatch(new LoadCategoriesFail(error)))
        );
    }

    @Action(LoadCategoriesSuccess)
    loadCategoriesSuccess(ctx: StateContext<CategoryStateModel>, {payload}: LoadCategoriesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadCategoriesFail)
    loadCategoriesFail(ctx: StateContext<CategoryStateModel>, {payload}: LoadCategoriesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadCategoriesUnity)
    loadCategoriesUnity(ctx: StateContext<CategoryStateModel>, {payload}: LoadCategoriesUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.categoryResource.findPerUnity(payload).pipe(
            map((Category: CategoryModel[]) => ctx.dispatch(new LoadCategoriesUnitySuccess(Category))),
            catchError((error) => ctx.dispatch(new LoadCategoriesUnityFail(error)))
        );
    }

    @Action(LoadCategoriesUnitySuccess)
    loadCategoriesUnitySuccess(ctx: StateContext<CategoryStateModel>, {payload}: LoadCategoriesUnitySuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadCategoriesUnityFail)
    loadCategoriesUnityFail(ctx: StateContext<CategoryStateModel>, {payload}: LoadCategoriesUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateCategory)
    createCategory(ctx: StateContext<CategoryStateModel>, action: CreateCategory) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.categoryResource.create(action.payload).pipe(
            map((Category: CategoryModel) => ctx.dispatch(new CreateCategorySuccess(Category))),
            catchError((error) => ctx.dispatch(new CreateCategoryFail(error)))
        );
    }

    @Action(CreateCategorySuccess)
    createCategorySuccess(ctx: StateContext<CategoryStateModel>, {payload}: CreateCategorySuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        ctx.dispatch(new CloseCategoryModal());
        this.presentToast('Categoria cadastrada com sucesso!');
    }

    @Action(CreateCategoryFail)
    createCategoryFail(ctx: StateContext<CategoryStateModel>, {payload}: CreateCategoryFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateCategory)
    updateCategory(ctx: StateContext<CategoryStateModel>, action: UpdateCategory) {
        ctx.patchState({isLoading: true});
        return this.categoryResource.update(action.payload).pipe(
            map((Category: CategoryModel) => ctx.dispatch(new UpdateCategorySuccess(Category))),
            catchError((error) => ctx.dispatch(new UpdateCategoryFail(error)))
        );
    }

    @Action(UpdateCategorySuccess)
    updateCategorySuccess(ctx: StateContext<CategoryStateModel>, {payload}: UpdateCategorySuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        ctx.dispatch(new CloseCategoryModal());
        ctx.dispatch(new Refresh());
        this.presentToast('Categoria atualizada com sucesso!');
    }

    @Action(UpdateCategoryFail)
    updateCategoryFail(ctx: StateContext<CategoryStateModel>, {payload}: UpdateCategoryFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteCategory)
    deleteCategory(ctx: StateContext<CategoryStateModel>, action: DeleteCategory) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.categoryResource.destroy(action.payload).pipe(
            map((Category: CategoryModel) => ctx.dispatch(new DeleteCategorySuccess(Category))),
            catchError((error) => ctx.dispatch(new DeleteCategoryFail(error)))
        );
    }

    @Action(DeleteCategorySuccess)
    deleteCategorySuccess(ctx: StateContext<CategoryStateModel>, {payload}: DeleteCategorySuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Categoria excluída com sucesso!');
    }

    @Action(DeleteCategoryFail)
    deleteCategoryFail(ctx: StateContext<CategoryStateModel>, {payload}: DeleteCategoryFail) {
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
