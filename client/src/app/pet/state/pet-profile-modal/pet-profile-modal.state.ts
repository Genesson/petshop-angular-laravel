import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetProfileModal, ClosePetProfileModal} from './pet-profile-modal.actions';

import {PetProfileModalService} from '../../services/pet-profile-modal.service';

export interface PetProfileModalStateModel {
    isLoading: boolean;
}

@State<PetProfileModalStateModel>({
    name: 'petProfileModal',
    defaults: {
        isLoading: false
    }
})

export class PetProfileModalState {

    constructor(private petProfileModalService: PetProfileModalService) {
    }

    @Action(OpenPetProfileModal)
    async openTutorModal(ctx: StateContext<PetProfileModalStateModel>, {payload}: OpenPetProfileModal) {
        await this.petProfileModalService.open(payload);
    }

    @Action(ClosePetProfileModal)
    closeTutorModal(ctx: StateContext<PetProfileModalStateModel>) {
        this.petProfileModalService.close();
    }

}
