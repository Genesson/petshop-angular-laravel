import {Action, State, StateContext} from '@ngxs/store';

import {OpenDreModal, CloseDreModal} from './dre-modal.actions';

import {DreModalService} from '../../services/dre-modal.service';

export interface DreModalStateModel {
    isLoading: boolean;
}

@State<DreModalStateModel>({
    name: 'dreModal',
    defaults: {
        isLoading: false
    }
})

export class DreModalState {

    constructor(private dreModalService: DreModalService) {
    }

    @Action(OpenDreModal)
    async openTutorModal(ctx: StateContext<DreModalStateModel>, {payload}: OpenDreModal) {
        await this.dreModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseDreModal)
    closeTutorModal(ctx: StateContext<DreModalStateModel>) {
        this.dreModalService.close();
    }

}
