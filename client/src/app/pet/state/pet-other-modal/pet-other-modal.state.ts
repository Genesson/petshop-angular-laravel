import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetOtherModal, ClosePetOtherModal} from './pet-other-modal.actions';

import {PetOtherModalService} from '../../services/pet-other-modal.service';

export interface PetOtherModalStateModel {
    isLoading: boolean;
}

@State<PetOtherModalStateModel>({
    name: 'petOtherModal',
    defaults: {
        isLoading: false
    }
})

export class PetOtherModalState {

    constructor(private petOtherModalService: PetOtherModalService) {
    }

    @Action(OpenPetOtherModal)
    async openTutorModal(ctx: StateContext<PetOtherModalStateModel>, { payload }: OpenPetOtherModal) {
      await this.petOtherModalService.open(payload.data, payload.category);
    }

    @Action(ClosePetOtherModal)
    closeTutorModal(ctx: StateContext<PetOtherModalStateModel>) {
      this.petOtherModalService.close();
    }

}
