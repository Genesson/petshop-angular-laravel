import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectType,
    LoadTypes,
    LoadTypesFail,
    LoadTypesSuccess,
    CreateType,
    CreateTypeFail,
    CreateTypeSuccess,
    UpdateType,
    UpdateTypeFail,
    UpdateTypeSuccess,
    DeleteType,
    DeleteTypeFail,
    DeleteTypeSuccess
} from './type.actions';
import {CloseTypeModal} from '../type-modal/type-modal.actions';

import {TypeModel} from '../../../shared/models/type.model';

import {TypeResource} from '../../../shared/resources/type.resource';

export class TypeStateModel extends NgxsEntityStateStateModel<TypeModel> {
    isLoading: boolean;
}

@State<TypeStateModel>({
    name: 'type',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class TypeState {

    @Selector()
    static selected(state: TypeStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: TypeStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: TypeStateModel) {
        return state.entities;
    }

    constructor(private typeResource: TypeResource,
                private toastController: ToastController) {
    }

    @Action(SelectType)
    selectType(ctx: StateContext<TypeStateModel>, {payload}: SelectType) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadTypes)
    loadTypes(ctx: StateContext<TypeStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.typeResource.find().pipe(
            map((Unity: TypeModel[]) => ctx.dispatch(new LoadTypesSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadTypesFail(error)))
        );
    }

    @Action(LoadTypesSuccess)
    loadTypesSuccess(ctx: StateContext<TypeStateModel>, {payload}: LoadTypesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadTypesFail)
    loadTypesFail(ctx: StateContext<TypeStateModel>, {payload}: LoadTypesFail) {
        console.warn(`Occorreu um erro ao carregar os estados ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateType)
    createType(ctx: StateContext<TypeStateModel>, action: CreateType) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.typeResource.create(action.payload).pipe(
            map((Type: TypeModel) => ctx.dispatch(new CreateTypeSuccess(Type))),
            catchError((error) => ctx.dispatch(new CreateTypeFail(error)))
        );
    }

    @Action(CreateTypeSuccess)
    createTypeSuccess(ctx: StateContext<TypeStateModel>, {payload}: CreateTypeSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Tipo cadastrado com sucesso!');
        ctx.dispatch(new SelectType(payload));
        ctx.dispatch(new CloseTypeModal());
    }

    @Action(CreateTypeFail)
    createTypeFail(ctx: StateContext<TypeStateModel>, {payload}: CreateTypeFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateType)
    updateType(ctx: StateContext<TypeStateModel>, action: UpdateType) {
        ctx.patchState({isLoading: true});
        return this.typeResource.update(action.payload).pipe(
            map((Type: TypeModel) => ctx.dispatch(new UpdateTypeSuccess(Type))),
            catchError((error) => ctx.dispatch(new UpdateTypeFail(error)))
        );
    }

    @Action(UpdateTypeSuccess)
    updateTypeSuccess(ctx: StateContext<TypeStateModel>, {payload}: UpdateTypeSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Tipo atualizado com sucesso!');
        ctx.dispatch(new CloseTypeModal());
    }

    @Action(UpdateTypeFail)
    updateTypeFail(ctx: StateContext<TypeStateModel>, {payload}: UpdateTypeFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteType)
    deleteType(ctx: StateContext<TypeStateModel>, action: DeleteType) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.typeResource.destroy(action.payload).pipe(
            map((Type: TypeModel) => ctx.dispatch(new DeleteTypeSuccess(Type))),
            catchError((error) => ctx.dispatch(new DeleteTypeFail(error)))
        );
    }

    @Action(DeleteTypeSuccess)
    deleteTypeSuccess(ctx: StateContext<TypeStateModel>, {payload}: DeleteTypeSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Tipo excluído com sucesso!');
    }

    @Action(DeleteTypeFail)
    deleteTypeFail(ctx: StateContext<TypeStateModel>, {payload}: DeleteTypeFail) {
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
