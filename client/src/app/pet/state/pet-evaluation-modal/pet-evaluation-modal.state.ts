import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetEvaluationModal, ClosePetEvaluationModal} from './pet-evaluation-modal.actions';

import {PetEvaluationModalService} from '../../services/pet-evaluation-modal.service';

export interface PetEvaluationModalStateModel {
    isLoading: boolean;
}

@State<PetEvaluationModalStateModel>({
    name: 'petEvaluationModal',
    defaults: {
        isLoading: false
    }
})

export class PetEvaluationModalState {

    constructor(private petEvaluationModalService: PetEvaluationModalService) {
    }

    @Action(OpenPetEvaluationModal)
    async openTutorModal(ctx: StateContext<PetEvaluationModalStateModel>, {payload}: OpenPetEvaluationModal) {
        await this.petEvaluationModalService.open(payload);
    }

    @Action(ClosePetEvaluationModal)
    closeTutorModal(ctx: StateContext<PetEvaluationModalStateModel>) {
        this.petEvaluationModalService.close();
    }

}
