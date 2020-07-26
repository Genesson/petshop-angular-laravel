import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetMedicineModal, ClosePetMedicineModal} from './pet-medicine-modal.actions';

import {PetMedicineModalService} from '../../services/pet-medicine-modal.service';

export interface PetMedicineModalStateModel {
    isLoading: boolean;
}

@State<PetMedicineModalStateModel>({
    name: 'petMedicineModal',
    defaults: {
        isLoading: false
    }
})

export class PetMedicineModalState {

    constructor(private unityModalService: PetMedicineModalService) {
    }

    @Action(OpenPetMedicineModal)
    async openPetMedicineModal(ctx: StateContext<PetMedicineModalStateModel>, {payload}: OpenPetMedicineModal) {
        await this.unityModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(ClosePetMedicineModal)
    closePetMedicineModal(ctx: StateContext<PetMedicineModalStateModel>) {
        this.unityModalService.close();
    }

}
