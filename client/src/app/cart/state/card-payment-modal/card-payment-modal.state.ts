import {Action, State, StateContext} from '@ngxs/store';

import {OpenCardPaymentModal, CloseCardPaymentModal} from './card-payment-modal.actions';

import {CardPaymentModalService} from '../../services/card-payment-modal.service';

export interface ReceiveModalStateModel {
    isLoading: boolean;
}

@State<ReceiveModalStateModel>({
    name: 'cardModal',
    defaults: {
        isLoading: false
    }
})

export class CardPaymentModalState {

    constructor(private cardPaymentModalService: CardPaymentModalService) {
    }

    @Action(OpenCardPaymentModal)
    async openCardPaymentModal(ctx: StateContext<ReceiveModalStateModel>, {payload}: OpenCardPaymentModal) {
        await this.cardPaymentModalService.open(payload);
    }

    @Action(CloseCardPaymentModal)
    closeCardPaymentModal(ctx: StateContext<ReceiveModalStateModel>) {
        this.cardPaymentModalService.close();
    }

}
