import {Action, State, StateContext} from '@ngxs/store';

import {OpenTypeFurModal, CloseTypeFurModal} from './type-fur-modal.actions';

import {TypeFurModalService} from '../../services/type-fur-modal.service';

export interface TypeFurModalStateModel {
    isLoading: boolean;
}

@State<TypeFurModalStateModel>({
    name: 'typeFurModal',
    defaults: {
        isLoading: false
    }
})

export class TypeFurModalState {

    constructor(private typeFurModalService: TypeFurModalService) {
    }

    @Action(OpenTypeFurModal)
    async openTutorModal(ctx: StateContext<TypeFurModalStateModel>, {payload}: OpenTypeFurModal) {
        await this.typeFurModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseTypeFurModal)
    closeTutorModal(ctx: StateContext<TypeFurModalStateModel>) {
        this.typeFurModalService.close();
    }

}
