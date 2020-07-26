import {Action, State, StateContext} from '@ngxs/store';

import {OpenTutorModal, CloseTutorModal} from './tutor-modal.actions';

import {TutorModalService} from '../../services/tutor-modal.service';

import { PetSandbox } from '../../../pet/pet.sandbox';

export interface TutorModalStateModel {
    isLoading: boolean;
}

@State<TutorModalStateModel>({
    name: 'tutorModal',
    defaults: {
        isLoading: false
    }
})

export class TutorModalState {

    constructor(private tutorModalService: TutorModalService, private petSandbox: PetSandbox) {
    }

    @Action(OpenTutorModal)
    async openTutorModal(ctx: StateContext<TutorModalStateModel>, {payload}: OpenTutorModal) {
        await this.tutorModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseTutorModal)
    closeTutorModal(ctx: StateContext<TutorModalStateModel>) {
        this.tutorModalService.close();
        this.petSandbox.loadPets();
    }

}
