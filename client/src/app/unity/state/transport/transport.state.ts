import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectTransport,
    LoadTransports,
    LoadTransportsSuccess,
    LoadTransportsFail,
    LoadTransportsUnity,
    LoadTransportsUnitySuccess,
    LoadTransportsUnityFail,
    CreateTransport,
    CreateTransportSuccess,
    CreateTransportFail,
    UpdateTransport,
    UpdateTransportSuccess,
    UpdateTransportFail,
    DeleteTransport,
    DeleteTransportSuccess,
    DeleteTransportFail
} from './transport.actions';
import {CloseTransportModal} from '../transport-modal/transport-modal.actions';

import {ServiceModel} from '../../../shared/models/service.model';

import {ServiceResource} from '../../../shared/resources/service.resource';

export class TransportStateModel extends NgxsEntityStateStateModel<ServiceModel> {
    isLoading: boolean;
}

@State<TransportStateModel>({
    name: 'transport',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class TransportState {

    @Selector()
    static selected(state: TransportStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: TransportStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: TransportStateModel) {
        return state.entities;
    }

    constructor(private transportResource: ServiceResource,
                private toastController: ToastController) {
    }

    @Action(SelectTransport)
    selectPaciente(ctx: StateContext<TransportStateModel>, {payload}: SelectTransport) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadTransports)
    loadTransports(ctx: StateContext<TransportStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.transportResource.find().pipe(
            map((Transport: ServiceModel[]) => ctx.dispatch(new LoadTransportsSuccess(Transport))),
            catchError((error) => ctx.dispatch(new LoadTransportsFail(error)))
        );
    }

    @Action(LoadTransportsSuccess)
    loadTransportsSuccess(ctx: StateContext<TransportStateModel>, {payload}: LoadTransportsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadTransportsFail)
    loadTransportsFail(ctx: StateContext<TransportStateModel>, {payload}: LoadTransportsFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadTransportsUnity)
    loadTransportsUnity(ctx: StateContext<TransportStateModel>, {payload}: LoadTransportsUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.transportResource.findTransportsPerUnity(payload).pipe(
            map((Transport: ServiceModel[]) => ctx.dispatch(new LoadTransportsUnitySuccess(Transport))),
            catchError((error) => ctx.dispatch(new LoadTransportsUnityFail(error)))
        );
    }

    @Action(LoadTransportsUnitySuccess)
    loadTransportsUnitySuccess(ctx: StateContext<TransportStateModel>, {payload}: LoadTransportsUnitySuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadTransportsUnityFail)
    loadTransportsUnityFail(ctx: StateContext<TransportStateModel>, {payload}: LoadTransportsUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateTransport)
    createTransport(ctx: StateContext<TransportStateModel>, action: CreateTransport) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.transportResource.create(action.payload).pipe(
            map((Transport: ServiceModel) => ctx.dispatch(new CreateTransportSuccess(Transport))),
            catchError((error) => ctx.dispatch(new CreateTransportFail(error)))
        );
    }

    @Action(CreateTransportSuccess)
    createTransportSuccess(ctx: StateContext<TransportStateModel>, {payload}: CreateTransportSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Transporte cadastrado com sucesso!');
        ctx.dispatch(new CloseTransportModal());
    }

    @Action(CreateTransportFail)
    createTransportFail(ctx: StateContext<TransportStateModel>, {payload}: CreateTransportFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateTransport)
    updateTransport(ctx: StateContext<TransportStateModel>, action: UpdateTransport) {
        ctx.patchState({isLoading: true});
        return this.transportResource.update(action.payload).pipe(
            map((Transport: ServiceModel) => ctx.dispatch(new UpdateTransportSuccess(Transport))),
            catchError((error) => ctx.dispatch(new UpdateTransportFail(error)))
        );
    }

    @Action(UpdateTransportSuccess)
    updateTransportSuccess(ctx: StateContext<TransportStateModel>, {payload}: UpdateTransportSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Transporte atualizado com sucesso!');
        ctx.dispatch(new CloseTransportModal());
    }

    @Action(UpdateTransportFail)
    updateTransportFail(ctx: StateContext<TransportStateModel>, {payload}: UpdateTransportFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteTransport)
    deleteTransport(ctx: StateContext<TransportStateModel>, action: DeleteTransport) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.transportResource.destroy(action.payload).pipe(
            map((Transport: ServiceModel) => ctx.dispatch(new DeleteTransportSuccess(Transport))),
            catchError((error) => ctx.dispatch(new DeleteTransportFail(error)))
        );
    }

    @Action(DeleteTransportSuccess)
    deleteTransportSuccess(ctx: StateContext<TransportStateModel>, {payload}: DeleteTransportSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Transporte excluído com sucesso!');
    }

    @Action(DeleteTransportFail)
    deleteTransportFail(ctx: StateContext<TransportStateModel>, {payload}: DeleteTransportFail) {
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
