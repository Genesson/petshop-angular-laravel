import {Action, State, StateContext} from '@ngxs/store';

import {OpenUnityModal, CloseUnityModal} from './unity-modal.actions';

import {UnityModalService} from '../../services/unity-modal.service';

export interface UnityModalStateModel {
    isLoading: boolean;
}

@State<UnityModalStateModel>({
    name: 'unityModal',
    defaults: {
        isLoading: false
    }
})

export class UnityModalState {

    constructor(private unityModalService: UnityModalService) {
    }

    @Action(OpenUnityModal)
    async openUnityModal(ctx: StateContext<UnityModalStateModel>, {payload}: OpenUnityModal) {
        await this.unityModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseUnityModal)
    closeUnityModal(ctx: StateContext<UnityModalStateModel>) {
        this.unityModalService.close();
    }

}
