import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetModal, ClosePetModal} from './pet-modal.actions';

import {PetModalService} from '../../services/pet-modal.service';

export interface PetModalStateModel {
    isLoading: boolean;
}

@State<PetModalStateModel>({
    name: 'petModal',
    defaults: {
        isLoading: false
    }
})

export class PetModalState {

    constructor(private petModalService: PetModalService) {
    }

    @Action(OpenPetModal)
    async openTutorModal(ctx: StateContext<PetModalStateModel>, {payload}: OpenPetModal) {
        await this.petModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(ClosePetModal)
    closeTutorModal(ctx: StateContext<PetModalStateModel>) {
        this.petModalService.close();
    }

}
