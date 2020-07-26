import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetCartModal, ClosePetCartModal} from './pet-cart-modal.actions';

import {PetCartModalService} from '../../services/pet-cart-modal.service';

export interface PetCartModalStateModel {
    isLoading: boolean;
}

@State<PetCartModalStateModel>({
    name: 'petCartModal',
    defaults: {
        isLoading: false
    }
})

export class PetCartModalState {

    constructor(private petCartModalService: PetCartModalService) {
    }

    @Action(OpenPetCartModal)
    async openTutorModal(ctx: StateContext<PetCartModalStateModel>) {
        await this.petCartModalService.open();
    }

    @Action(ClosePetCartModal)
    closeTutorModal(ctx: StateContext<PetCartModalStateModel>) {
        this.petCartModalService.close();
    }

}
