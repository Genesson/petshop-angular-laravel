import {Action, State, StateContext} from '@ngxs/store';

import {CloseRegionModal, OpenRegionModal} from './region-modal.actions';

import {RegionModalService} from '../../services/region-modal.service';

export interface RegionModalStateModel {
    isLoading: boolean;
}

@State<RegionModalStateModel>({
    name: 'regionModal',
    defaults: {
        isLoading: false
    }
})

export class RegionModalState {

    constructor(private regionModalService: RegionModalService) {
    }

    @Action(OpenRegionModal)
    async openTutorModal(ctx: StateContext<RegionModalStateModel>, {payload}: OpenRegionModal) {
        await this.regionModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseRegionModal)
    closeTutorModal(ctx: StateContext<RegionModalStateModel>) {
        this.regionModalService.close();
    }

}
