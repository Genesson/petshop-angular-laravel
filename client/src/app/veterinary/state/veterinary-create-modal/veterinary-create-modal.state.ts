import {Action, State, StateContext} from '@ngxs/store';

import {OpenVeterinaryCreateModal, CloseVeterinaryCreateModal} from './veterinary-create-modal.actions';

import {VeterinaryCreateModalService} from '../../services/veterinary-create-modal.service';

export interface VeterinaryCreateModalStateModel {
    isLoading: boolean;
}

@State<VeterinaryCreateModalStateModel>({
    name: 'veterinaryCreateModal',
    defaults: {
        isLoading: false
    }
})

export class VeterinaryCreateModalState {

    constructor(private veterinaryCreateModalService: VeterinaryCreateModalService) {
    }

    @Action(OpenVeterinaryCreateModal)
    async openTutorModal(ctx: StateContext<VeterinaryCreateModalStateModel>, {payload}: OpenVeterinaryCreateModal) {
        await this.veterinaryCreateModalService.open(payload);
    }

    @Action(CloseVeterinaryCreateModal)
    closeTutorModal(ctx: StateContext<VeterinaryCreateModalStateModel>) {
        this.veterinaryCreateModalService.close();
    }

}
