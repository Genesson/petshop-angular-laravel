import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetDiseaseModal, ClosePetDiseaseModal} from './pet-disease-modal.actions';

import {PetDiseaseModalService} from '../../services/pet-disease-modal.service';

export interface PetDiseaseModalStateModel {
    isLoading: boolean;
}

@State<PetDiseaseModalStateModel>({
    name: 'petDiseaseModal',
    defaults: {
        isLoading: false
    }
})

export class PetDiseaseModalState {

    constructor(private unityModalService: PetDiseaseModalService) {
    }

    @Action(OpenPetDiseaseModal)
    async openPetDiseaseModal(ctx: StateContext<PetDiseaseModalStateModel>, {payload}: OpenPetDiseaseModal) {
        await this.unityModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(ClosePetDiseaseModal)
    closePetDiseaseModal(ctx: StateContext<PetDiseaseModalStateModel>) {
        this.unityModalService.close();
    }

}
