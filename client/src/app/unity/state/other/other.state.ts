import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectOther,
    LoadOthers,
    LoadOthersSuccess,
    LoadOthersFail,
    LoadOthersUnity,
    LoadOthersUnitySuccess,
    LoadOthersUnityFail,
    CreateOther,
    CreateOtherSuccess,
    CreateOtherFail,
    UpdateOther,
    UpdateOtherSuccess,
    UpdateOtherFail,
    DeleteOther,
    DeleteOtherSuccess,
    DeleteOtherFail
} from './other.actions';
import {CloseOtherModal} from '../other-modal/other-modal.actions';

import {ServiceModel} from '../../../shared/models/service.model';

import {ServiceResource} from '../../../shared/resources/service.resource';

export class OtherStateModel extends NgxsEntityStateStateModel<ServiceModel> {
    isLoading: boolean;
}

@State<OtherStateModel>({
    name: 'other',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class OtherState {

    @Selector()
    static selected(state: OtherStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: OtherStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: OtherStateModel) {
        return state.entities;
    }

    constructor(private otherResource: ServiceResource,
                private toastController: ToastController) {
    }

    @Action(SelectOther)
    selectPaciente(ctx: StateContext<OtherStateModel>, {payload}: SelectOther) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadOthers)
    loadOthers(ctx: StateContext<OtherStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.otherResource.find().pipe(
            map((Other: ServiceModel[]) => ctx.dispatch(new LoadOthersSuccess(Other))),
            catchError((error) => ctx.dispatch(new LoadOthersFail(error)))
        );
    }

    @Action(LoadOthersSuccess)
    loadOthersSuccess(ctx: StateContext<OtherStateModel>, {payload}: LoadOthersSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadOthersFail)
    loadOthersFail(ctx: StateContext<OtherStateModel>, {payload}: LoadOthersFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadOthersUnity)
    loadOthersUnity(ctx: StateContext<OtherStateModel>, {payload}: LoadOthersUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.otherResource.findOthersPerUnity(payload).pipe(
            map((Other: ServiceModel[]) => ctx.dispatch(new LoadOthersUnitySuccess(Other))),
            catchError((error) => ctx.dispatch(new LoadOthersUnityFail(error)))
        );
    }

    @Action(LoadOthersUnitySuccess)
    loadOthersUnitySuccess(ctx: StateContext<OtherStateModel>, {payload}: LoadOthersUnitySuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadOthersUnityFail)
    loadOthersUnityFail(ctx: StateContext<OtherStateModel>, {payload}: LoadOthersUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateOther)
    createOther(ctx: StateContext<OtherStateModel>, action: CreateOther) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.otherResource.create(action.payload).pipe(
            map((Other: ServiceModel) => ctx.dispatch(new CreateOtherSuccess(Other))),
            catchError((error) => ctx.dispatch(new CreateOtherFail(error)))
        );
    }

    @Action(CreateOtherSuccess)
    createOtherSuccess(ctx: StateContext<OtherStateModel>, {payload}: CreateOtherSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Serviço cadastrado com sucesso!');
        ctx.dispatch(new CloseOtherModal());
    }

    @Action(CreateOtherFail)
    createOtherFail(ctx: StateContext<OtherStateModel>, {payload}: CreateOtherFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateOther)
    updateOther(ctx: StateContext<OtherStateModel>, action: UpdateOther) {
        ctx.patchState({isLoading: true});
        return this.otherResource.update(action.payload).pipe(
            map((Other: ServiceModel) => ctx.dispatch(new UpdateOtherSuccess(Other))),
            catchError((error) => ctx.dispatch(new UpdateOtherFail(error)))
        );
    }

    @Action(UpdateOtherSuccess)
    updateOtherSuccess(ctx: StateContext<OtherStateModel>, {payload}: UpdateOtherSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Serviço atualizado com sucesso!');
        ctx.dispatch(new CloseOtherModal());
    }

    @Action(UpdateOtherFail)
    updateOtherFail(ctx: StateContext<OtherStateModel>, {payload}: UpdateOtherFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteOther)
    deleteOther(ctx: StateContext<OtherStateModel>, action: DeleteOther) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.otherResource.destroy(action.payload).pipe(
            map((Other: ServiceModel) => ctx.dispatch(new DeleteOtherSuccess(Other))),
            catchError((error) => ctx.dispatch(new DeleteOtherFail(error)))
        );
    }

    @Action(DeleteOtherSuccess)
    deleteOtherSuccess(ctx: StateContext<OtherStateModel>, {payload}: DeleteOtherSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Serviço excluído com sucesso!');
    }

    @Action(DeleteOtherFail)
    deleteOtherFail(ctx: StateContext<OtherStateModel>, {payload}: DeleteOtherFail) {
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
