import {Action, State, StateContext} from '@ngxs/store';

import {OpenTypeModal, CloseTypeModal} from './type-modal.actions';

import {TypeModalService} from '../../services/type-modal.service';

export interface TypeModalStateModel {
    isLoading: boolean;
}

@State<TypeModalStateModel>({
    name: 'typeModal',
    defaults: {
        isLoading: false
    }
})

export class TypeModalState {

    constructor(private typeModalService: TypeModalService) {
    }

    @Action(OpenTypeModal)
    async openTutorModal(ctx: StateContext<TypeModalStateModel>, {payload}: OpenTypeModal) {
        await this.typeModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseTypeModal)
    closeTutorModal(ctx: StateContext<TypeModalStateModel>) {
        this.typeModalService.close();
    }

}
