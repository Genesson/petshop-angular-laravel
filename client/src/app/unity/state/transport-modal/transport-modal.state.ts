import {Action, State, StateContext} from '@ngxs/store';

import {OpenTransportModal, CloseTransportModal} from './transport-modal.actions';

import {TransportModalService} from '../../services/transport-modal.service';

export interface TransportModalStateModel {
    isLoading: boolean;
}

@State<TransportModalStateModel>({
    name: 'transportModal',
    defaults: {
        isLoading: false
    }
})

export class TransportModalState {

    constructor(private transportModalService: TransportModalService) {
    }

    @Action(OpenTransportModal)
    async openTransportModal(ctx: StateContext<TransportModalStateModel>, {payload}: OpenTransportModal) {
        await this.transportModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseTransportModal)
    closeTransportModal(ctx: StateContext<TransportModalStateModel>) {
        this.transportModalService.close();
    }
}
