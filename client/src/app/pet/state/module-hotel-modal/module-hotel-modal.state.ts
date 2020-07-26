import {Action, State, StateContext} from '@ngxs/store';

import {OpenModuleHotelModal, CloseModuleHotelModal} from './module-hotel-modal.actions';

import {ModuleHotelModalService} from '../../services/module-hotel-modal.service';

export interface ModuleHotelModalStateModel {
    isLoading: boolean;
}

@State<ModuleHotelModalStateModel>({
    name: 'moduleHotelModal',
    defaults: {
        isLoading: false
    }
})

export class ModuleHotelModalState {

    constructor(private moduleHotelModalService: ModuleHotelModalService) {
    }

    @Action(OpenModuleHotelModal)
    async openTutorModal(ctx: StateContext<ModuleHotelModalStateModel>, {payload}: OpenModuleHotelModal) {
        await this.moduleHotelModalService.open(payload);
    }

    @Action(CloseModuleHotelModal)
    closeTutorModal(ctx: StateContext<ModuleHotelModalStateModel>) {
        this.moduleHotelModalService.close();
    }

}
