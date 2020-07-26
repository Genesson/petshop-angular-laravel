import {Action, State, StateContext} from '@ngxs/store';

import {OpenPackagePetCreateModal, ClosePackagePetCreateModal} from './package-pet-create-modal.actions';

import {PackagePetCreateModalService} from '../../services/package-pet-create-modal.service';

export interface PackagePetCreateModalStateModel {
    isLoading: boolean;
}

@State<PackagePetCreateModalStateModel>({
    name: 'packagePetCreateModal',
    defaults: {
        isLoading: false
    }
})

export class PackagePetCreateModalState {

    constructor(private packageCreateModalService: PackagePetCreateModalService) {
    }

    @Action(OpenPackagePetCreateModal)
    async openTutorModal(ctx: StateContext<PackagePetCreateModalStateModel>, {payload}: OpenPackagePetCreateModal) {
        await this.packageCreateModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(ClosePackagePetCreateModal)
    closeTutorModal(ctx: StateContext<PackagePetCreateModalStateModel>) {
        this.packageCreateModalService.close();
    }

}
