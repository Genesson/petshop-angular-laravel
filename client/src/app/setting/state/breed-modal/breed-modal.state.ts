import {Action, State, StateContext} from '@ngxs/store';

import {OpenBreedModal, CloseBreedModal} from './breed-modal.actions';

import {BreedModalService} from '../../services/breed-modal.service';

export interface BreedModalStateModel {
    isLoading: boolean;
}

@State<BreedModalStateModel>({
    name: 'breedModal',
    defaults: {
        isLoading: false
    }
})

export class BreedModalState {

    constructor(private breedModalService: BreedModalService) {
    }

    @Action(OpenBreedModal)
    async openTutorModal(ctx: StateContext<BreedModalStateModel>, {payload}: OpenBreedModal) {
        await this.breedModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseBreedModal)
    closeTutorModal(ctx: StateContext<BreedModalStateModel>) {
        this.breedModalService.close();
    }

}
