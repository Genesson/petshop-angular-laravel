import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetVaccineModal, ClosePetVaccineModal} from './pet-vaccine-modal.actions';

import {PetVaccineModalService} from '../../services/pet-vaccine-modal.service';

export interface PetVaccineModalStateModel {
    isLoading: boolean;
}

@State<PetVaccineModalStateModel>({
    name: 'petVaccineModal',
    defaults: {
        isLoading: false
    }
})

export class PetVaccineModalState {

    constructor(private unityModalService: PetVaccineModalService) {
    }

    @Action(OpenPetVaccineModal)
    async openPetVaccineModal(ctx: StateContext<PetVaccineModalStateModel>, {payload}: OpenPetVaccineModal) {
        await this.unityModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(ClosePetVaccineModal)
    closePetVaccineModal(ctx: StateContext<PetVaccineModalStateModel>) {
        this.unityModalService.close();
    }

}
