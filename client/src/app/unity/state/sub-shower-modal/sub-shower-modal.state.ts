import {Action, State, StateContext} from '@ngxs/store';

import {OpenSubShowerModal, CloseSubShowerModal} from './sub-shower-modal.actions';

import {SubShowerModalService} from '../../services/sub-shower-modal.service';

export interface SubShowerModalStateModel {
    isLoading: boolean;
}

@State<SubShowerModalStateModel>({
    name: 'subShowerModal',
    defaults: {
        isLoading: false
    }
})

export class SubShowerModalState {

    constructor(private subShowerModalService: SubShowerModalService) {
    }

    @Action(OpenSubShowerModal)
    async openSubShowerModal(ctx: StateContext<SubShowerModalStateModel>, {payload}: OpenSubShowerModal) {
        await this.subShowerModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseSubShowerModal)
    closeSubShowerModal(ctx: StateContext<SubShowerModalStateModel>) {
        this.subShowerModalService.close();
    }
}
