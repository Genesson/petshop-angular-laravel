import {Action, State, StateContext} from '@ngxs/store';

import {OpenPriceVariationModal, ClosePriceVariationModal} from './price-variation-modal.actions';

import {PriceVariationModalService} from '../../services/price-variation-modal.service';

export interface PriceVariationModalStateModel {
    isLoading: boolean;
}

@State<PriceVariationModalStateModel>({
    name: 'priceVariationModal',
    defaults: {
        isLoading: false
    }
})

export class PriceVariationModalState {

    constructor(private priceVariationModalService: PriceVariationModalService) {
    }

    @Action(OpenPriceVariationModal)
    async openTutorModal(ctx: StateContext<PriceVariationModalStateModel>, {payload}: OpenPriceVariationModal) {
        await this.priceVariationModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(ClosePriceVariationModal)
    closeTutorModal(ctx: StateContext<PriceVariationModalStateModel>) {
        this.priceVariationModalService.close();
    }

}
