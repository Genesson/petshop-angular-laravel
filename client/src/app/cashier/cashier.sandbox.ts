import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {CashierSelectors} from './state/cashier/cashier.selectors';
import {PayableSelectors} from './state/payable/payable.selectors';
import {ReceivableSelectors} from './state/receivable/receivable.selectors';

import {
    SelectCashier,
    LoadCashiers,
    CreateCashier
} from './state/cashier/cashier.actions';
import {
    SelectPayable,
    LoadPayables,
    CreatePayable,
    UpdatePayable,
    DeletePayable
} from './state/payable/payable.actions';
import {
    SelectReceivable,
    LoadReceivables,
    LoadReceivablesTotals,
    CreateReceivable,
    UpdateReceivable,
    DeleteReceivable
} from './state/receivable/receivable.actions';
import {
    OpenReceiveModal,
    CloseReceiveModal, OpenReceiveViewModal, CloseReceiveViewModal
} from './state/receive-modal/receive-modal.actions';
import {
    OpenCashierModal,
    CloseCashierModal
} from './state/cashier-modal/cashier-modal.actions';

import {CashierModel} from '../shared/models/cashier.model';
import {PayableModel} from '../shared/models/payable.model';
import {ReceivableModel} from '../shared/models/receivable.model';

@Injectable({
    providedIn: 'root'
})
export class CashierSandbox {

    @Select(CashierSelectors.entities) cashiersCollection$: Observable<CashierModel[]>;

    @Select(CashierSelectors.selected) cashierSelected$: Observable<CashierModel>;

    @Select(CashierSelectors.isLoading) isLoadingCashier$: Observable<boolean>;

    @Select(PayableSelectors.entities) payablesCollection$: Observable<PayableModel[]>;

    @Select(PayableSelectors.selected) payableSelected$: Observable<PayableModel>;

    @Select(PayableSelectors.isLoading) isLoadingPayable$: Observable<boolean>;

    @Select(ReceivableSelectors.entities) receivablesCollection$: Observable<ReceivableModel[]>;

    @Select(ReceivableSelectors.selected) receivableSelected$: Observable<ReceivableModel>;

    @Select(ReceivableSelectors.isLoading) isLoadingReceivable$: Observable<boolean>;

    @Select(ReceivableSelectors.total) total$: Observable<number>;

    @Select(ReceivableSelectors.totals) totals$: Observable<any>;

    constructor(private store: Store) {
    }

    public selectCashier(cashier: CashierModel) {
        this.store.dispatch(new SelectCashier(cashier));
    }

    public loadCashiers() {
        this.store.dispatch(new LoadCashiers());
    }

    public createCashier(cashier: CashierModel) {
        this.store.dispatch(new CreateCashier(cashier));
    }

    public selectPayable(payable: PayableModel) {
        this.store.dispatch(new SelectPayable(payable));
    }

    public loadPayables() {
        this.store.dispatch(new LoadPayables());
    }

    public createPayable(payable: PayableModel) {
        this.store.dispatch(new CreatePayable(payable));
    }

    public updatePayable(payable: PayableModel) {
        this.store.dispatch(new UpdatePayable(payable));
    }

    public deletePayable(payable: PayableModel) {
        this.store.dispatch(new DeletePayable(payable));
    }

    public selectReceivable(receivable: ReceivableModel) {
        this.store.dispatch(new SelectReceivable(receivable));
    }

    public loadReceivables(receive) {
        this.store.dispatch(new LoadReceivables(receive));
    }

    public LoadReceivablesTotals() {
        this.store.dispatch(new LoadReceivablesTotals());
    }

    public createReceivable(receivable: ReceivableModel) {
        this.store.dispatch(new CreateReceivable(receivable));
    }

    public updateReceivable(receivable: ReceivableModel) {
        this.store.dispatch(new UpdateReceivable(receivable));
    }

    public deleteReceivable(receivable: ReceivableModel) {
        this.store.dispatch(new DeleteReceivable(receivable));
    }

    public openReceiveModal(receivable: ReceivableModel) {
        this.store.dispatch(new OpenReceiveModal(receivable));
    }

    public closeReceiveModal() {
        this.store.dispatch(new CloseReceiveModal());
    }

    public openReceiveViewModal(receivable: ReceivableModel) {
        this.store.dispatch(new OpenReceiveViewModal(receivable));
    }

    public closeReceiveViewModal() {
        this.store.dispatch(new CloseReceiveViewModal());
    }

    public openCashierModal(action, operation, data) {
        this.store.dispatch(new OpenCashierModal({action, operation, data}));
    }

    public closeCashierModal() {
        this.store.dispatch(new CloseCashierModal());
    }

}
