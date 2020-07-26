import {Action, State, StateContext} from '@ngxs/store';

import {OpenPetScheduleModal, ClosePetScheduleModal} from './pet-schedule-modal.actions';

import {PetScheduleModalService} from '../../services/pet-schedule-modal.service';

export interface PetScheduleModalStateModel {
    isLoading: boolean;
}

@State<PetScheduleModalStateModel>({
    name: 'petScheduleModal',
    defaults: {
        isLoading: false
    }
})

export class PetScheduleModalState {

    constructor(private petScheduleModalService: PetScheduleModalService) {
    }

    @Action(OpenPetScheduleModal)
    async openTutorModal(ctx: StateContext<PetScheduleModalStateModel>, {payload}: OpenPetScheduleModal) {
        await this.petScheduleModalService.open(payload.service, (payload.data) ? payload.data : null);
    }

    @Action(ClosePetScheduleModal)
    closeTutorModal(ctx: StateContext<PetScheduleModalStateModel>) {
        this.petScheduleModalService.close();
    }

}
