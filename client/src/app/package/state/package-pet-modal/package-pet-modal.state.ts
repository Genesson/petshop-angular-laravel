import {Action, State, StateContext} from '@ngxs/store';

import {OpenPackagePetModal, ClosePackagePetModal} from './package-pet-modal.actions';

import {PackagePetModalService} from '../../services/package-pet-modal.service';

export interface PackagePetModalStateModel {
    isLoading: boolean;
}

@State<PackagePetModalStateModel>({
    name: 'packagePetModal',
    defaults: {
        isLoading: false
    }
})

export class PackagePetModalState {

    constructor(private packagePetModalService: PackagePetModalService) {
    }

    @Action(OpenPackagePetModal)
    async openTutorModal(ctx: StateContext<PackagePetModalStateModel>) {
        await this.packagePetModalService.open();
    }

    @Action(ClosePackagePetModal)
    closeTutorModal(ctx: StateContext<PackagePetModalStateModel>) {
        this.packagePetModalService.close();
    }

}
