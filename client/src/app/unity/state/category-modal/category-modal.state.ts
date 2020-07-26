import {Action, State, StateContext} from '@ngxs/store';

import {OpenCategoryModal, CloseCategoryModal} from './category-modal.actions';

import {CategoryModalService} from '../../services/category-modal.service';

export interface CategoryModalStateModel {
    isLoading: boolean;
}

@State<CategoryModalStateModel>({
    name: 'categoryModal',
    defaults: {
        isLoading: false
    }
})

export class CategoryModalState {

    constructor(private unityModalService: CategoryModalService) {
    }

    @Action(OpenCategoryModal)
    async openCategoryModal(ctx: StateContext<CategoryModalStateModel>, {payload}: OpenCategoryModal) {
        await this.unityModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseCategoryModal)
    closeCategoryModal(ctx: StateContext<CategoryModalStateModel>) {
        this.unityModalService.close();
    }

}
