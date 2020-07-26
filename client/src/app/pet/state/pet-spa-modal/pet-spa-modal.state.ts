import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetSpaModal, ClosePetSpaModal} from './pet-spa-modal.actions';

import {PetSpaModalService} from '../../services/pet-spa-modal.service';

export interface PetSpaModalStateModel {
    isLoading: boolean;
}

@State<PetSpaModalStateModel>({
    name: 'petSpaModal',
    defaults: {
        isLoading: false
    }
})

export class PetSpaModalState {

    constructor(private petSpaModalService: PetSpaModalService) {
    }

    @Action(OpenPetSpaModal)
    async openTutorModal(ctx: StateContext<PetSpaModalStateModel>, {payload}: OpenPetSpaModal) {
        await this.petSpaModalService.open(payload.data, payload.category);
    }

    @Action(ClosePetSpaModal)
    closeTutorModal(ctx: StateContext<PetSpaModalStateModel>) {
        this.petSpaModalService.close();
    }

}
