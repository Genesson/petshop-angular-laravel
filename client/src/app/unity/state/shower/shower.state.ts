import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectShower,
    LoadShowers,
    LoadShowersSuccess,
    LoadShowersFail,
    LoadShowersUnity,
    LoadShowersUnitySuccess,
    LoadShowersUnityFail,
    CreateShower,
    CreateShowerSuccess,
    CreateShowerFail,
    UpdateShower,
    UpdateShowerSuccess,
    UpdateShowerFail,
    DeleteShower,
    DeleteShowerSuccess,
    DeleteShowerFail
} from './shower.actions';
import {CloseShowerModal} from '../shower-modal/shower-modal.actions';

import {ServiceModel} from '../../../shared/models/service.model';

import {ServiceResource} from '../../../shared/resources/service.resource';

export class ShowerStateModel extends NgxsEntityStateStateModel<ServiceModel> {
    isLoading: boolean;
}

@State<ShowerStateModel>({
    name: 'shower',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class ShowerState {

    @Selector()
    static selected(state: ShowerStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: ShowerStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: ShowerStateModel) {
        return state.entities;
    }

    constructor(private showerResource: ServiceResource,
                private toastController: ToastController) {
    }

    @Action(SelectShower)
    selectPaciente(ctx: StateContext<ShowerStateModel>, {payload}: SelectShower) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadShowers)
    loadShowers(ctx: StateContext<ShowerStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.showerResource.find().pipe(
            map((Shower: ServiceModel[]) => ctx.dispatch(new LoadShowersSuccess(Shower))),
            catchError((error) => ctx.dispatch(new LoadShowersFail(error)))
        );
    }

    @Action(LoadShowersSuccess)
    loadShowersSuccess(ctx: StateContext<ShowerStateModel>, {payload}: LoadShowersSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadShowersFail)
    loadShowersFail(ctx: StateContext<ShowerStateModel>, {payload}: LoadShowersFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadShowersUnity)
    loadShowersUnity(ctx: StateContext<ShowerStateModel>, {payload}: LoadShowersUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.showerResource.findShowersPerUnity(payload).pipe(
            map((Shower: ServiceModel[]) => ctx.dispatch(new LoadShowersUnitySuccess(Shower))),
            catchError((error) => ctx.dispatch(new LoadShowersUnityFail(error)))
        );
    }

    @Action(LoadShowersUnitySuccess)
    loadShowersUnitySuccess(ctx: StateContext<ShowerStateModel>, {payload}: LoadShowersUnitySuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadShowersUnityFail)
    loadShowersUnityFail(ctx: StateContext<ShowerStateModel>, {payload}: LoadShowersUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateShower)
    createShower(ctx: StateContext<ShowerStateModel>, action: CreateShower) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.showerResource.create(action.payload).pipe(
            map((Shower: ServiceModel) => ctx.dispatch(new CreateShowerSuccess(Shower))),
            catchError((error) => ctx.dispatch(new CreateShowerFail(error)))
        );
    }

    @Action(CreateShowerSuccess)
    createShowerSuccess(ctx: StateContext<ShowerStateModel>, {payload}: CreateShowerSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Banho cadastrado com sucesso!');
        ctx.dispatch(new CloseShowerModal());
    }

    @Action(CreateShowerFail)
    createShowerFail(ctx: StateContext<ShowerStateModel>, {payload}: CreateShowerFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateShower)
    updateShower(ctx: StateContext<ShowerStateModel>, action: UpdateShower) {
        ctx.patchState({isLoading: true});
        return this.showerResource.update(action.payload).pipe(
            map((Shower: ServiceModel) => ctx.dispatch(new UpdateShowerSuccess(Shower))),
            catchError((error) => ctx.dispatch(new UpdateShowerFail(error)))
        );
    }

    @Action(UpdateShowerSuccess)
    updateShowerSuccess(ctx: StateContext<ShowerStateModel>, {payload}: UpdateShowerSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Banho atualizado com sucesso!');
        ctx.dispatch(new CloseShowerModal());
    }

    @Action(UpdateShowerFail)
    updateShowerFail(ctx: StateContext<ShowerStateModel>, {payload}: UpdateShowerFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteShower)
    deleteShower(ctx: StateContext<ShowerStateModel>, action: DeleteShower) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.showerResource.destroy(action.payload).pipe(
            map((Shower: ServiceModel) => ctx.dispatch(new DeleteShowerSuccess(Shower))),
            catchError((error) => ctx.dispatch(new DeleteShowerFail(error)))
        );
    }

    @Action(DeleteShowerSuccess)
    deleteShowerSuccess(ctx: StateContext<ShowerStateModel>, {payload}: DeleteShowerSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Banho excluído com sucesso!');
    }

    @Action(DeleteShowerFail)
    deleteShowerFail(ctx: StateContext<ShowerStateModel>, {payload}: DeleteShowerFail) {
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
