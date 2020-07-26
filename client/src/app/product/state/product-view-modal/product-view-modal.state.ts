import {Action, State, StateContext} from '@ngxs/store';

import {OpenProductViewModal, CloseProductViewModal} from './product-view-modal.actions';

import {ProductViewModalService} from '../../services/product-view-modal.service';

export interface ProductModalStateModel {
    isLoading: boolean;
}

@State<ProductModalStateModel>({
    name: 'productViewModal',
    defaults: {
        isLoading: false
    }
})

export class ProductViewModalState {

    constructor(private productViewModalService: ProductViewModalService) {
    }

    @Action(OpenProductViewModal)
    async openTutorModal(ctx: StateContext<ProductModalStateModel>, {payload}: OpenProductViewModal) {
        await this.productViewModalService.open(payload);
    }

    @Action(CloseProductViewModal)
    closeTutorModal(ctx: StateContext<ProductModalStateModel>) {
        this.productViewModalService.close();
    }

}
