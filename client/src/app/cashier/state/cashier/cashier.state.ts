import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectCashier,
    LoadCashiers,
    LoadCashiersSuccess,
    LoadCashiersFail,
    CreateCashier,
    CreateCashierSuccess,
    CreateCashierFail
} from './cashier.actions';
import {CloseCashierModal} from '../cashier-modal/cashier-modal.actions';

import {CashierModel} from '../../../shared/models/cashier.model';

import {CashierResource} from '../../../shared/resources/cashier.resource';

import {CashierActionType} from '../../../shared/enums/cashier.enum';
import {LoadReceivablesTotals} from '../receivable/receivable.actions';

export class CashierStateModel extends NgxsEntityStateStateModel<CashierModel> {
    isLoading: boolean;
}

@State<CashierStateModel>({
    name: 'cashier',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class CashierState {

    @Selector()
    static selected(state: CashierStateModel) {
        return state.selected;
    }

    @Selector()
    static isLoading(state: CashierStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: CashierStateModel) {
        return state.entities;
    }

    constructor(private cashierResource: CashierResource,
                private toastController: ToastController,
                private store: Store) {
    }

    @Action(SelectCashier)
    selectCashier(ctx: StateContext<CashierStateModel>, {payload}: SelectCashier) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadCashiers)
    loadCashiers(ctx: StateContext<CashierStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.cashierResource.find().pipe(
            map((Cashier: CashierModel[]) => ctx.dispatch(new LoadCashiersSuccess(Cashier))),
            catchError((error) => ctx.dispatch(new LoadCashiersFail(error)))
        );
    }

    @Action(LoadCashiersSuccess)
    loadCashiersSuccess(ctx: StateContext<CashierStateModel>, {payload}: LoadCashiersSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadCashiersFail)
    loadCashiersFail(ctx: StateContext<CashierStateModel>, {payload}: LoadCashiersFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateCashier)
    createCashier(ctx: StateContext<CashierStateModel>, action: CreateCashier) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.cashierResource.create(action.payload).pipe(
            map((Cashier: CashierModel) => ctx.dispatch(new CreateCashierSuccess(Cashier))),
            catchError((error) => ctx.dispatch(new CreateCashierFail(error)))
        );
    }

    @Action(CreateCashierSuccess)
    createCashierSuccess(ctx: StateContext<CashierStateModel>, {payload}: CreateCashierSuccess) {
        console.log('payload', payload);
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Caixa ' + CashierActionType[payload.action] + ' com sucesso!');
        ctx.dispatch(new SelectCashier(payload));
        ctx.dispatch(new CloseCashierModal());
        this.store.dispatch(new LoadReceivablesTotals());
    }

    @Action(CreateCashierFail)
    createCashierFail(ctx: StateContext<CashierStateModel>, {payload}: CreateCashierFail) {
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
