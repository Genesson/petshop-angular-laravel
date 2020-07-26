import {Action, State, StateContext} from '@ngxs/store';

import {OpenProductCategoryModal, CloseProductCategoryModal} from './product-category-modal.actions';

import {ProductCategoryModalService} from '../../services/product-category-modal.service';

export interface ProductCategoryModalStateModel {
    isLoading: boolean;
}

@State<ProductCategoryModalStateModel>({
    name: 'productCategoryModal',
    defaults: {
        isLoading: false
    }
})

export class ProductCategoryModalState {

    constructor(private productModalService: ProductCategoryModalService) {
    }

    @Action(OpenProductCategoryModal)
    async openTutorModal(ctx: StateContext<ProductCategoryModalStateModel>, {payload}: OpenProductCategoryModal) {
        await this.productModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseProductCategoryModal)
    closeTutorModal(ctx: StateContext<ProductCategoryModalStateModel>) {
        this.productModalService.close();
    }

}
