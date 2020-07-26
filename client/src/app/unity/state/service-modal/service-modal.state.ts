import {Action, State, StateContext} from '@ngxs/store';

import {OpenServiceModal, CloseServiceModal} from './service-modal.actions';

import {ServiceModalService} from '../../services/service-modal.service';

export interface ServiceModalStateModel {
    isLoading: boolean;
}

@State<ServiceModalStateModel>({
    name: 'serviceModal',
    defaults: {
        isLoading: false
    }
})

export class ServiceModalState {

    constructor(private unityModalService: ServiceModalService) {
    }

    @Action(OpenServiceModal)
    async openServiceModal(ctx: StateContext<ServiceModalStateModel>, {payload}: OpenServiceModal) {
        await this.unityModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseServiceModal)
    closeServiceModal(ctx: StateContext<ServiceModalStateModel>) {
        this.unityModalService.close();
    }

}
