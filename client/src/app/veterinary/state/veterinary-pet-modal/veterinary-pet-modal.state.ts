import {Action, State, StateContext} from '@ngxs/store';

import {OpenVeterinaryPetModal, CloseVeterinaryPetModal} from './veterinary-pet-modal.actions';

import {VeterinaryPetModalService} from '../../services/veterinary-pet-modal.service';

export interface VeterinaryPetModalStateModel {
    isLoading: boolean;
}

@State<VeterinaryPetModalStateModel>({
    name: 'veterinaryPetModal',
    defaults: {
        isLoading: false
    }
})

export class VeterinaryPetModalState {

    constructor(private veterinaryPetModalService: VeterinaryPetModalService) {
    }

    @Action(OpenVeterinaryPetModal)
    async openTutorModal(ctx: StateContext<VeterinaryPetModalStateModel>) {
        await this.veterinaryPetModalService.open();
    }

    @Action(CloseVeterinaryPetModal)
    closeTutorModal(ctx: StateContext<VeterinaryPetModalStateModel>) {
        this.veterinaryPetModalService.close();
    }

}
