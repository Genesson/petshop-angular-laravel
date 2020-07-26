import {Action, State, StateContext} from '@ngxs/store';

import {OpenShowerModal, CloseShowerModal} from './shower-modal.actions';

import {ShowerModalService} from '../../services/shower-modal.service';

export interface ShowerModalStateModel {
    isLoading: boolean;
}

@State<ShowerModalStateModel>({
    name: 'showerModal',
    defaults: {
        isLoading: false
    }
})

export class ShowerModalState {

    constructor(private showerModalService: ShowerModalService) {
    }

    @Action(OpenShowerModal)
    async openShowerModal(ctx: StateContext<ShowerModalStateModel>, {payload}: OpenShowerModal) {
        await this.showerModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseShowerModal)
    closeShowerModal(ctx: StateContext<ShowerModalStateModel>) {
        this.showerModalService.close();
    }
}
