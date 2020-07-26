import {Action, State, StateContext} from '@ngxs/store';

import {OpenPackageCreateModal, ClosePackageCreateModal} from './package-create-modal.actions';

import {PackageCreateModalService} from '../../services/package-create-modal.service';

export interface PackageCreateModalStateModel {
    isLoading: boolean;
}

@State<PackageCreateModalStateModel>({
    name: 'packageCreateModal',
    defaults: {
        isLoading: false
    }
})

export class PackageCreateModalState {

    constructor(private packageCreateModalService: PackageCreateModalService) {
    }

    @Action(OpenPackageCreateModal)
    async openTutorModal(ctx: StateContext<PackageCreateModalStateModel>, {payload}: OpenPackageCreateModal) {
        await this.packageCreateModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(ClosePackageCreateModal)
    closeTutorModal(ctx: StateContext<PackageCreateModalStateModel>) {
        this.packageCreateModalService.close();
    }

}
