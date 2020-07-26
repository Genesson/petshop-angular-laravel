import {Action, State, StateContext} from '@ngxs/store';

import {CloseCardFlagModal, OpenCardFlagModal} from './card-flags-modal.actions';

import {CardFlagsModalService} from '../../services/card-flags-modal.service';

export interface CardFlagModalStateModel {
    isLoading: boolean;
}

@State<CardFlagModalStateModel>({
    name: 'cardFlagModal',
    defaults: {
        isLoading: false
    }
})

export class CardFlagModalState {

    constructor(private cardFlagsModalService: CardFlagsModalService) {
    }

    @Action(OpenCardFlagModal)
    async openCardFlagModal(ctx: StateContext<CardFlagModalStateModel>, {payload}: OpenCardFlagModal) {
        await this.cardFlagsModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseCardFlagModal)
    closeCardFlagModal(ctx: StateContext<CloseCardFlagModal>) {
        this.cardFlagsModalService.close();
    }

}
