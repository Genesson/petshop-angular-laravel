import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetSitterModal, ClosePetSitterModal} from './pet-sitter-modal.actions';

import {PetSitterModalService} from '../../services/pet-sitter-modal.service';

export interface PetSitterModalStateModel {
    isLoading: boolean;
}

@State<PetSitterModalStateModel>({
    name: 'petSitterModal',
    defaults: {
        isLoading: false
    }
})

export class PetSitterModalState {

    constructor(private petSitterModalService: PetSitterModalService) {
    }

    @Action(OpenPetSitterModal)
    async openPetSitterModal(ctx: StateContext<PetSitterModalStateModel>, {payload}: OpenPetSitterModal) {
        await this.petSitterModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(ClosePetSitterModal)
    closePetSitterModal(ctx: StateContext<PetSitterModalStateModel>) {
        this.petSitterModalService.close();
    }
}
