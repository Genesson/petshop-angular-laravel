import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectReceivable,
    LoadReceivables,
    LoadReceivablesFail,
    LoadReceivablesSuccess,
    LoadReceivablesTotals,
    LoadReceivablesTotalsSuccess,
    LoadReceivablesTotalsFail,
    CreateReceivable,
    CreateReceivableFail,
    CreateReceivableSuccess,
    UpdateReceivable,
    UpdateReceivableFail,
    UpdateReceivableSuccess,
    DeleteReceivable,
    DeleteReceivableFail,
    DeleteReceivableSuccess
} from './receivable.actions';

import {ReceivableModel} from '../../../shared/models/receivable.model';

import {ReceivableResource} from '../../../shared/resources/receivable.resource';
import {LoadCashiers} from '../cashier/cashier.actions';
import {CloseReceiveModal} from '../receive-modal/receive-modal.actions';

export class ReceivableStateModel extends NgxsEntityStateStateModel<ReceivableModel> {
    isLoading: boolean;
    totals: { received: number, receivableToday: number, receivable: number };
}

@State<ReceivableStateModel>({
    name: 'receivable',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        totals: {received: 0, receivableToday: 0, receivable: 0},
        isLoading: false
    },
})
@Injectable()
export class ReceivableState {

    @Selector()
    static selected(state: ReceivableStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: ReceivableStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: ReceivableStateModel) {
        return state.entities;
    }

    @Selector()
    static totals(state: ReceivableStateModel) {
        return state.totals;
    }

    constructor(private receivableResource: ReceivableResource,
                private toastController: ToastController,
                private store: Store) {
    }

    @Action(SelectReceivable)
    selectReceivable(ctx: StateContext<ReceivableStateModel>, {payload}: SelectReceivable) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadReceivables)
    loadReceivables(ctx: StateContext<ReceivableStateModel>, {payload}: LoadReceivables) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.receivableResource.find(payload).pipe(
            map((Unity: ReceivableModel[]) => ctx.dispatch(new LoadReceivablesSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadReceivablesFail(error)))
        );
    }

    @Action(LoadReceivablesSuccess)
    loadReceivablesSuccess(ctx: StateContext<ReceivableStateModel>, {payload}: LoadReceivablesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadReceivablesFail)
    loadReceivablesFail(ctx: StateContext<ReceivableStateModel>, {payload}: LoadReceivablesFail) {
        console.warn(`Occorreu um erro ao carregar os parcelas ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadReceivablesTotals)
    loadReceivablesTotal(ctx: StateContext<ReceivableStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.receivableResource.findOne().pipe(
            map((Unity) => ctx.dispatch(new LoadReceivablesTotalsSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadReceivablesTotalsFail(error)))
        );
    }

    @Action(LoadReceivablesTotalsSuccess)
    loadReceivablesTotalSuccess(ctx: StateContext<ReceivableStateModel>, {payload}: LoadReceivablesTotalsSuccess) {
        ctx.patchState({
            totals: {
                received: payload.received,
                receivableToday: payload.receivableToday,
                receivable: payload.receivable
            }
        });
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadReceivablesTotalsFail)
    loadReceivablesTotalFail(ctx: StateContext<ReceivableStateModel>, {payload}: LoadReceivablesTotalsFail) {
        console.warn(`Occorreu um erro ao carregar os totais ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateReceivable)
    createReceivable(ctx: StateContext<ReceivableStateModel>, action: CreateReceivable) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.receivableResource.create(action.payload).pipe(
            map((Receivable: ReceivableModel) => ctx.dispatch(new CreateReceivableSuccess(Receivable))),
            catchError((error) => ctx.dispatch(new CreateReceivableFail(error)))
        );
    }

    @Action(CreateReceivableSuccess)
    createReceivableSuccess(ctx: StateContext<ReceivableStateModel>, {payload}: CreateReceivableSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Parcela cadastrada com sucesso!');
        ctx.dispatch(new SelectReceivable(payload));
    }

    @Action(CreateReceivableFail)
    createReceivableFail(ctx: StateContext<ReceivableStateModel>, {payload}: CreateReceivableFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateReceivable)
    updateReceivable(ctx: StateContext<ReceivableStateModel>, action: UpdateReceivable) {
        ctx.patchState({isLoading: true});
        return this.receivableResource.update(action.payload).pipe(
            map((Receivable: ReceivableModel) => ctx.dispatch(new UpdateReceivableSuccess(Receivable))),
            catchError((error) => ctx.dispatch(new UpdateReceivableFail(error)))
        );
    }

    @Action(UpdateReceivableSuccess)
    updateReceivableSuccess(ctx: StateContext<ReceivableStateModel>, {payload}: UpdateReceivableSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Parcela atualizada com sucesso!');
        this.store.dispatch(new LoadReceivablesTotals());
        this.store.dispatch(new LoadCashiers());
        this.store.dispatch(new LoadReceivables('NOT_RECEIVED'));
        this.store.dispatch(new CloseReceiveModal());
    }

    @Action(UpdateReceivableFail)
    updateReceivableFail(ctx: StateContext<ReceivableStateModel>, {payload}: UpdateReceivableFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteReceivable)
    deleteReceivable(ctx: StateContext<ReceivableStateModel>, action: DeleteReceivable) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.receivableResource.destroy(action.payload).pipe(
            map((Receivable: ReceivableModel) => ctx.dispatch(new DeleteReceivableSuccess(Receivable))),
            catchError((error) => ctx.dispatch(new DeleteReceivableFail(error)))
        );
    }

    @Action(DeleteReceivableSuccess)
    deleteReceivableSuccess(ctx: StateContext<ReceivableStateModel>, {payload}: DeleteReceivableSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Parcela excluída com sucesso!');
    }

    @Action(DeleteReceivableFail)
    deleteReceivableFail(ctx: StateContext<ReceivableStateModel>, {payload}: DeleteReceivableFail) {
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
