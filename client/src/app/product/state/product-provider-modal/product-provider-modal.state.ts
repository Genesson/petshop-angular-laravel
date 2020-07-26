import {Action, State, StateContext} from '@ngxs/store';

import {OpenProductProviderModal, CloseProductProviderModal} from './product-provider-modal.actions';

import {ProductProviderModalService} from '../../services/product-provider-modal.service';

export interface ProductProviderModalStateModel {
    isLoading: boolean;
}

@State<ProductProviderModalStateModel>({
    name: 'productProviderModal',
    defaults: {
        isLoading: false
    }
})

export class ProductProviderModalState {

    constructor(private productModalService: ProductProviderModalService) {
    }

    @Action(OpenProductProviderModal)
    async openTutorModal(ctx: StateContext<ProductProviderModalStateModel>, {payload}: OpenProductProviderModal) {
        await this.productModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseProductProviderModal)
    closeTutorModal(ctx: StateContext<ProductProviderModalStateModel>) {
        this.productModalService.close();
    }

}
