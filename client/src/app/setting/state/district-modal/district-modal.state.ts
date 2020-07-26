import {Action, State, StateContext} from '@ngxs/store';

import {OpenDistrictModal, CloseDistrictModal} from './district-modal.actions';

import {DistrictModalService} from '../../services/district-modal.service';

export interface DistrictModalStateModel {
    isLoading: boolean;
}

@State<DistrictModalStateModel>({
    name: 'districtModal',
    defaults: {
        isLoading: false
    }
})

export class DistrictModalState {

    constructor(private districtModalService: DistrictModalService) {
    }

    @Action(OpenDistrictModal)
    async openTutorModal(ctx: StateContext<DistrictModalStateModel>, {payload}: OpenDistrictModal) {
        await this.districtModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseDistrictModal)
    closeTutorModal(ctx: StateContext<DistrictModalStateModel>) {
        this.districtModalService.close();
    }

}
