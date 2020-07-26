import {Action, State, StateContext} from '@ngxs/store';

import {
    OpenDaycareModal,
    CloseDaycareModal,
    OpenDaycareCheckModal,
    CloseDaycareCheckModal,
    OpenDaycareClassModal,
    CloseDaycareClassModal
} from './daycare-modal.actions';

import {DaycareModalService} from '../../services/daycare-modal.service';

export interface DaycareModalStateModel {
    isLoading: boolean;
}

@State<DaycareModalStateModel>({
    name: 'daycareModal',
    defaults: {
        isLoading: false
    }
})

export class DaycareModalState {

    constructor(private daycareModalService: DaycareModalService) {
    }

    @Action(OpenDaycareModal)
    async openDaycareModal(ctx: StateContext<DaycareModalStateModel>) {
        await this.daycareModalService.openDaycare();
    }

    @Action(CloseDaycareModal)
    closeDaycareModal(ctx: StateContext<DaycareModalStateModel>) {
        this.daycareModalService.closeDaycare();
    }

    @Action(OpenDaycareCheckModal)
    async openDaycareCheckModal(ctx: StateContext<DaycareModalStateModel>) {
        await this.daycareModalService.openDaycareCheck();
    }

    @Action(CloseDaycareCheckModal)
    closeDaycareCheckModal(ctx: StateContext<DaycareModalStateModel>) {
        this.daycareModalService.closeDaycareCheck();
    }

    @Action(OpenDaycareClassModal)
    async openDaycareClassModal(ctx: StateContext<DaycareModalStateModel>) {
        await this.daycareModalService.openDaycareClass();
    }

    @Action(CloseDaycareClassModal)
    closeDaycareClassModal(ctx: StateContext<DaycareModalStateModel>) {
        this.daycareModalService.closeDaycareClass();
    }

}
