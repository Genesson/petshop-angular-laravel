import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectPayable,
    LoadPayables,
    LoadPayablesFail,
    LoadPayablesSuccess,
    CreatePayable,
    CreatePayableFail,
    CreatePayableSuccess,
    UpdatePayable,
    UpdatePayableFail,
    UpdatePayableSuccess,
    DeletePayable,
    DeletePayableFail,
    DeletePayableSuccess
} from './payable.actions';

import {PayableModel} from '../../../shared/models/payable.model';

import {PayableResource} from '../../../shared/resources/payable.resource';

export class PayableStateModel extends NgxsEntityStateStateModel<PayableModel> {
    isLoading: boolean;
}

@State<PayableStateModel>({
    name: 'payable',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class PayableState {

    @Selector()
    static selected(state: PayableStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PayableStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PayableStateModel) {
        return state.entities;
    }

    constructor(private payableResource: PayableResource,
                private toastController: ToastController) {
    }

    @Action(SelectPayable)
    selectPayable(ctx: StateContext<PayableStateModel>, {payload}: SelectPayable) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPayables)
    loadPayables(ctx: StateContext<PayableStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.payableResource.find().pipe(
            map((Unity: PayableModel[]) => ctx.dispatch(new LoadPayablesSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadPayablesFail(error)))
        );
    }

    @Action(LoadPayablesSuccess)
    loadPayablesSuccess(ctx: StateContext<PayableStateModel>, {payload}: LoadPayablesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPayablesFail)
    loadPayablesFail(ctx: StateContext<PayableStateModel>, {payload}: LoadPayablesFail) {
        console.warn(`Occorreu um erro ao carregar os comportamentos ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreatePayable)
    createPayable(ctx: StateContext<PayableStateModel>, action: CreatePayable) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.payableResource.create(action.payload).pipe(
            map((Payable: PayableModel) => ctx.dispatch(new CreatePayableSuccess(Payable))),
            catchError((error) => ctx.dispatch(new CreatePayableFail(error)))
        );
    }

    @Action(CreatePayableSuccess)
    createPayableSuccess(ctx: StateContext<PayableStateModel>, {payload}: CreatePayableSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Parcela cadastrada com sucesso!');
        ctx.dispatch(new SelectPayable(payload));
    }

    @Action(CreatePayableFail)
    createPayableFail(ctx: StateContext<PayableStateModel>, {payload}: CreatePayableFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdatePayable)
    updatePayable(ctx: StateContext<PayableStateModel>, action: UpdatePayable) {
        ctx.patchState({isLoading: true});
        return this.payableResource.update(action.payload).pipe(
            map((Payable: PayableModel) => ctx.dispatch(new UpdatePayableSuccess(Payable))),
            catchError((error) => ctx.dispatch(new UpdatePayableFail(error)))
        );
    }

    @Action(UpdatePayableSuccess)
    updatePayableSuccess(ctx: StateContext<PayableStateModel>, {payload}: UpdatePayableSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Parcela atualizada com sucesso!');
    }

    @Action(UpdatePayableFail)
    updatePayableFail(ctx: StateContext<PayableStateModel>, {payload}: UpdatePayableFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeletePayable)
    deletePayable(ctx: StateContext<PayableStateModel>, action: DeletePayable) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.payableResource.destroy(action.payload).pipe(
            map((Payable: PayableModel) => ctx.dispatch(new DeletePayableSuccess(Payable))),
            catchError((error) => ctx.dispatch(new DeletePayableFail(error)))
        );
    }

    @Action(DeletePayableSuccess)
    deletePayableSuccess(ctx: StateContext<PayableStateModel>, {payload}: DeletePayableSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Parcela excluída com sucesso!');
    }

    @Action(DeletePayableFail)
    deletePayableFail(ctx: StateContext<PayableStateModel>, {payload}: DeletePayableFail) {
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
