import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectTypeFur,
    LoadTypeFurs,
    LoadTypeFursFail,
    LoadTypeFursSuccess,
    CreateTypeFur,
    CreateTypeFurFail,
    CreateTypeFurSuccess,
    UpdateTypeFur,
    UpdateTypeFurFail,
    UpdateTypeFurSuccess,
    DeleteTypeFur,
    DeleteTypeFurFail,
    DeleteTypeFurSuccess
} from './type-fur.actions';
import {CloseTypeFurModal} from '../type-fur-modal/type-fur-modal.actions';

import {TypeFurModel} from '../../../shared/models/type-fur.model';

import {TypeFurResource} from '../../../shared/resources/type-fur.resource';

export class TypeFurStateModel extends NgxsEntityStateStateModel<TypeFurModel> {
    isLoading: boolean;
}

@State<TypeFurStateModel>({
    name: 'typeFur',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class TypeFurState {

    @Selector()
    static selected(state: TypeFurStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: TypeFurStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: TypeFurStateModel) {
        return state.entities;
    }

    constructor(private typeFurResource: TypeFurResource,
                private toastController: ToastController) {
    }

    @Action(SelectTypeFur)
    selectTypeFur(ctx: StateContext<TypeFurStateModel>, {payload}: SelectTypeFur) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadTypeFurs)
    loadTypeFurs(ctx: StateContext<TypeFurStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.typeFurResource.find().pipe(
            map((Unity: TypeFurModel[]) => ctx.dispatch(new LoadTypeFursSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadTypeFursFail(error)))
        );
    }

    @Action(LoadTypeFursSuccess)
    loadTypeFursSuccess(ctx: StateContext<TypeFurStateModel>, {payload}: LoadTypeFursSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadTypeFursFail)
    loadTypeFursFail(ctx: StateContext<TypeFurStateModel>, {payload}: LoadTypeFursFail) {
        console.warn(`Occorreu um erro ao carregar os estados ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateTypeFur)
    createTypeFur(ctx: StateContext<TypeFurStateModel>, action: CreateTypeFur) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.typeFurResource.create(action.payload).pipe(
            map((TypeFur: TypeFurModel) => ctx.dispatch(new CreateTypeFurSuccess(TypeFur))),
            catchError((error) => ctx.dispatch(new CreateTypeFurFail(error)))
        );
    }

    @Action(CreateTypeFurSuccess)
    createTypeFurSuccess(ctx: StateContext<TypeFurStateModel>, {payload}: CreateTypeFurSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Tipo de pelo cadastrado com sucesso!');
        ctx.dispatch(new SelectTypeFur(payload));
        ctx.dispatch(new CloseTypeFurModal());
    }

    @Action(CreateTypeFurFail)
    createTypeFurFail(ctx: StateContext<TypeFurStateModel>, {payload}: CreateTypeFurFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateTypeFur)
    updateTypeFur(ctx: StateContext<TypeFurStateModel>, action: UpdateTypeFur) {
        ctx.patchState({isLoading: true});
        return this.typeFurResource.update(action.payload).pipe(
            map((TypeFur: TypeFurModel) => ctx.dispatch(new UpdateTypeFurSuccess(TypeFur))),
            catchError((error) => ctx.dispatch(new UpdateTypeFurFail(error)))
        );
    }

    @Action(UpdateTypeFurSuccess)
    updateTypeFurSuccess(ctx: StateContext<TypeFurStateModel>, {payload}: UpdateTypeFurSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Tipo de pelo atualizado com sucesso!');
        ctx.dispatch(new CloseTypeFurModal());
    }

    @Action(UpdateTypeFurFail)
    updateTypeFurFail(ctx: StateContext<TypeFurStateModel>, {payload}: UpdateTypeFurFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteTypeFur)
    deleteTypeFur(ctx: StateContext<TypeFurStateModel>, action: DeleteTypeFur) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.typeFurResource.destroy(action.payload).pipe(
            map((TypeFur: TypeFurModel) => ctx.dispatch(new DeleteTypeFurSuccess(TypeFur))),
            catchError((error) => ctx.dispatch(new DeleteTypeFurFail(error)))
        );
    }

    @Action(DeleteTypeFurSuccess)
    deleteTypeFurSuccess(ctx: StateContext<TypeFurStateModel>, {payload}: DeleteTypeFurSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Tipo de pelo excluído com sucesso!');
    }

    @Action(DeleteTypeFurFail)
    deleteTypeFurFail(ctx: StateContext<TypeFurStateModel>, {payload}: DeleteTypeFurFail) {
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
