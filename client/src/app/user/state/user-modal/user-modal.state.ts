import {Action, State, StateContext} from '@ngxs/store';

import {OpenUserModal, CloseUserModal} from './user-modal.actions';

import {UserModalService} from '../../services/user-modal.service';

export interface UserModalStateModel {
    isLoading: boolean;
}

@State<UserModalStateModel>({
    name: 'userModal',
    defaults: {
        isLoading: false
    }
})

export class UserModalState {

    constructor(private userModalService: UserModalService) {
    }

    @Action(OpenUserModal)
    async openUserModal(ctx: StateContext<UserModalStateModel>, {payload}: OpenUserModal) {
        await this.userModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseUserModal)
    closeUserModal(ctx: StateContext<UserModalStateModel>) {
        this.userModalService.close();
    }

}
