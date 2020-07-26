import {Action, State, StateContext} from '@ngxs/store';

import {OpenPermissionModal, ClosePermissionModal} from './permission-modal.actions';

import {PermissionModalService} from '../../services/permission-modal.service';

export interface PermissionModalStateModel {
    isLoading: boolean;
}

@State<PermissionModalStateModel>({
    name: 'permissionModal',
    defaults: {
        isLoading: false
    }
})

export class PermissionModalState {

    constructor(private permissionModalService: PermissionModalService) {
    }

    @Action(OpenPermissionModal)
    async openPermissionModal(ctx: StateContext<PermissionModalStateModel>, {payload}: OpenPermissionModal) {
        await this.permissionModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(ClosePermissionModal)
    closePermissionModal(ctx: StateContext<PermissionModalStateModel>) {
        this.permissionModalService.close();
    }

}
