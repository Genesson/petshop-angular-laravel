import {Action, State, StateContext} from '@ngxs/store';

import {OpenScheduleListModal, CloseScheduleListModal} from './schedule-list-modal.actions';

import {ScheduleListModalService} from '../../services/schedule-list-modal.service';

export interface ScheduleListModalStateModel {
    isLoading: boolean;
}

@State<ScheduleListModalStateModel>({
    name: 'scheduleListModal',
    defaults: {
        isLoading: false
    }
})

export class ScheduleListModalState {

    constructor(private scheduleListModalService: ScheduleListModalService) {
    }

    @Action(OpenScheduleListModal)
    async openTutorModal(ctx: StateContext<ScheduleListModalStateModel>) {
        await this.scheduleListModalService.open();
    }

    @Action(CloseScheduleListModal)
    closeTutorModal(ctx: StateContext<ScheduleListModalStateModel>) {
        this.scheduleListModalService.close();
    }

}
