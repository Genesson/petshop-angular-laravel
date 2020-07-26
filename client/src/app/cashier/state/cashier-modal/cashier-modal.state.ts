import {Action, State, StateContext} from '@ngxs/store';

import {CloseCashierModal, OpenCashierModal} from './cashier-modal.actions';

import {CashierModalService} from '../../services/cashier-modal.service';

export interface CashierModalStateModel {
    isLoading: boolean;
}

@State<CashierModalStateModel>({
    name: 'cashierModal',
    defaults: {
        isLoading: false
    }
})

export class CashierModalState {

    constructor(private cashierModalService: CashierModalService) {
    }

    @Action(OpenCashierModal)
    async openTutorModal(ctx: StateContext<CashierModalStateModel>, {payload}: OpenCashierModal) {
        await this.cashierModalService.open(payload.action, payload.operation, payload.data);
    }

    @Action(CloseCashierModal)
    closeTutorModal(ctx: StateContext<CashierModalStateModel>) {
        this.cashierModalService.close();
    }

}
