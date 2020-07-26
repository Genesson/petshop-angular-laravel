import {Action, State, StateContext} from '@ngxs/store';

import {OpenDayCareModal, CloseDayCareModal} from './day-care-modal.actions';

import {DayCareModalService} from '../../services/day-care-modal.service';

export interface DayCareModalStateModel {
    isLoading: boolean;
}

@State<DayCareModalStateModel>({
    name: 'dayCareModal',
    defaults: {
        isLoading: false
    }
})

export class DayCareModalState {

    constructor(private dayCareModalService: DayCareModalService) {
    }

    @Action(OpenDayCareModal)
    async openDayCareModal(ctx: StateContext<DayCareModalStateModel>, {payload}: OpenDayCareModal) {
        await this.dayCareModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseDayCareModal)
    closeDayCareModal(ctx: StateContext<DayCareModalStateModel>) {
        this.dayCareModalService.close();
    }
}
