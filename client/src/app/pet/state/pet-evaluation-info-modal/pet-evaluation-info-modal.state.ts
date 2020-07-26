import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetEvaluationInfoModal, ClosePetEvaluationInfoModal} from './pet-evaluation-info-modal.actions';

import {PetEvaluationInfoModalService} from '../../services/pet-evaluation-info-modal.service';

export interface PetEvaluationInfoModalStateModel {
    isLoading: boolean;
}

@State<PetEvaluationInfoModalStateModel>({
    name: 'petEvaluationInfoModal',
    defaults: {
        isLoading: false
    }
})

export class PetEvaluationInfoInfoModalState {

    constructor(private petEvaluationInfoModalService: PetEvaluationInfoModalService) {
    }

    @Action(OpenPetEvaluationInfoModal)
    async openTutorModal(ctx: StateContext<PetEvaluationInfoModalStateModel>, {payload}: OpenPetEvaluationInfoModal) {
        await this.petEvaluationInfoModalService.open(payload);
    }

    @Action(ClosePetEvaluationInfoModal)
    closeTutorModal(ctx: StateContext<PetEvaluationInfoModalStateModel>) {
        this.petEvaluationInfoModalService.close();
    }

}
