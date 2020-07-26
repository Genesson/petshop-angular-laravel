import {Action, State, StateContext} from '@ngxs/store';

import {OpenOtherModal, CloseOtherModal} from './other-modal.actions';

import {OtherModalService} from '../../services/other-modal.service';

export interface OtherModalStateModel {
    isLoading: boolean;
}

@State<OtherModalStateModel>({
    name: 'otherModal',
    defaults: {
        isLoading: false
    }
})

export class OtherModalState {

    constructor(private otherModalService: OtherModalService) {
    }

    @Action(OpenOtherModal)
    async openOtherModal(ctx: StateContext<OtherModalStateModel>, {payload}: OpenOtherModal) {
        await this.otherModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseOtherModal)
    closeOtherModal(ctx: StateContext<OtherModalStateModel>) {
        this.otherModalService.close();
    }
}
