import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetServiceModal, ClosePetServiceModal} from './pet-service-modal.actions';

import {PetServiceModalService} from '../../services/pet-service-modal.service';

export interface PetServiceModalStateModel {
    isLoading: boolean;
}

@State<PetServiceModalStateModel>({
    name: 'petServiceModal',
    defaults: {
        isLoading: false
    }
})

export class PetServiceModalState {

    constructor(private petServiceModalService: PetServiceModalService) {
    }

    @Action(OpenPetServiceModal)
    async openTutorModal(ctx: StateContext<PetServiceModalStateModel>, {payload}: OpenPetServiceModal) {
        await this.petServiceModalService.open(payload);
    }

    @Action(ClosePetServiceModal)
    closeTutorModal(ctx: StateContext<PetServiceModalStateModel>) {
        this.petServiceModalService.close();
    }

}
