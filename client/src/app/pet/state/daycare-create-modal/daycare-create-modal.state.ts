import {Action, State, StateContext} from '@ngxs/store';

import {OpenDaycareCreateModal, CloseDaycareCreateModal} from './daycare-create-modal.actions';

import {DaycareCreateModalService} from '../../services/daycare-create-modal.service';

export interface DaycareCreateModalStateModel {
    isLoading: boolean;
}

@State<DaycareCreateModalStateModel>({
    name: 'daycareCreateModal',
    defaults: {
        isLoading: false
    }
})

export class DaycareCreateModalState {

    constructor(private daycareCreateModalService: DaycareCreateModalService) {
    }

    @Action(OpenDaycareCreateModal)
    async openTutorModal(ctx: StateContext<DaycareCreateModalStateModel>, {payload}: OpenDaycareCreateModal) {
        await this.daycareCreateModalService.open(payload.service, (payload.data) ? payload.data : null);
    }

    @Action(CloseDaycareCreateModal)
    closeTutorModal(ctx: StateContext<DaycareCreateModalStateModel>) {
        this.daycareCreateModalService.close();
    }

}
