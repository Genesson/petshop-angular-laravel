import {Action, State, StateContext} from '@ngxs/store';

import {OpenBehaviorModal, CloseBehaviorModal} from './behavior-modal.actions';

import {BehaviorModalService} from '../../services/behavior-modal.service';

export interface BehaviorModalStateModel {
    isLoading: boolean;
}

@State<BehaviorModalStateModel>({
    name: 'behaviorModal',
    defaults: {
        isLoading: false
    }
})

export class BehaviorModalState {

    constructor(private behaviorModalService: BehaviorModalService) {
    }

    @Action(OpenBehaviorModal)
    async openTutorModal(ctx: StateContext<BehaviorModalStateModel>, {payload}: OpenBehaviorModal) {
        await this.behaviorModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseBehaviorModal)
    closeTutorModal(ctx: StateContext<BehaviorModalStateModel>) {
        this.behaviorModalService.close();
    }

}
