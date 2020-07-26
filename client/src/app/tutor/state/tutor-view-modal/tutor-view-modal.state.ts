import {Action, State, StateContext} from '@ngxs/store';

import {OpenTutorViewModal, CloseTutorViewModal} from './tutor-view-modal.actions';

import {TutorViewModalService} from '../../services/tutor-view-modal.service';

export interface TutorViewModalStateModel {
    isLoading: boolean;
}

@State<TutorViewModalStateModel>({
    name: 'tutorViewModal',
    defaults: {
        isLoading: false
    }
})

export class TutorViewModalState {

    constructor(private tutorViewModalService: TutorViewModalService) {
    }

    @Action(OpenTutorViewModal)
    async openTutorViewModal(ctx: StateContext<TutorViewModalStateModel>, payload: OpenTutorViewModal) {
        await this.tutorViewModalService.open(payload);
    }

    @Action(CloseTutorViewModal)
    closeTutorViewModal(ctx: StateContext<TutorViewModalStateModel>) {
        this.tutorViewModalService.close();
    }

}
