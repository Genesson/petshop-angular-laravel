import {Action, State, StateContext} from '@ngxs/store';

import {OpenCheckModal, CloseCheckModal} from './check-modal.actions';

import {CheckModalService} from '../../services/check-modal.service';

export interface CheckModalStateModel {
    isLoading: boolean;
}

@State<CheckModalStateModel>({
    name: 'checkModal',
    defaults: {
        isLoading: false
    }
})

export class CheckModalState {

    constructor(private checkModalService: CheckModalService) {
    }

    @Action(OpenCheckModal)
    async openTutorModal(ctx: StateContext<CheckModalStateModel>, {payload}: OpenCheckModal) {
        await this.checkModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseCheckModal)
    closeTutorModal(ctx: StateContext<CheckModalStateModel>) {
        this.checkModalService.close();
    }

}
