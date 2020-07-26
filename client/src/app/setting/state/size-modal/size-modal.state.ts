import {Action, State, StateContext} from '@ngxs/store';

import {OpenSizeModal, CloseSizeModal} from './size-modal.actions';

import {SizeModalService} from '../../services/size-modal.service';

export interface SizeModalStateModel {
    isLoading: boolean;
}

@State<SizeModalStateModel>({
    name: 'sizeModal',
    defaults: {
        isLoading: false
    }
})

export class SizeModalState {

    constructor(private sizeModalService: SizeModalService) {
    }

    @Action(OpenSizeModal)
    async openTutorModal(ctx: StateContext<SizeModalStateModel>, {payload}: OpenSizeModal) {
        await this.sizeModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseSizeModal)
    closeTutorModal(ctx: StateContext<SizeModalStateModel>) {
        this.sizeModalService.close();
    }

}
