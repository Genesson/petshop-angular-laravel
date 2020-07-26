import {Action, State, StateContext} from '@ngxs/store';

import {OpenProductModal, CloseProductModal} from './product-modal.actions';

import {ProductModalService} from '../../services/product-modal.service';

export interface ProductModalStateModel {
    isLoading: boolean;
}

@State<ProductModalStateModel>({
    name: 'productModal',
    defaults: {
        isLoading: false
    }
})

export class ProductModalState {

    constructor(private productModalService: ProductModalService) {
    }

    @Action(OpenProductModal)
    async openTutorModal(ctx: StateContext<ProductModalStateModel>, {payload}: OpenProductModal) {
        await this.productModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseProductModal)
    closeTutorModal(ctx: StateContext<ProductModalStateModel>) {
        this.productModalService.close();
    }

}
