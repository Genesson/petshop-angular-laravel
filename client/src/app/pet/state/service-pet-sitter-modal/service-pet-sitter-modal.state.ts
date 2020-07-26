import {Action, State, StateContext} from '@ngxs/store';

import {OpenServicePetSitterModal, CloseServicePetSitterModal} from './service-pet-sitter-modal.actions';

import {PetSitterModalService} from '../../services/pet-sitter-modal.service';

export interface ServicePetSitterModalStateModel {
    isLoading: boolean;
}

@State<ServicePetSitterModalStateModel>({
    name: 'servicePetSitterModal',
    defaults: {
        isLoading: false
    }
})

export class ServicePetSitterModalState {

    constructor(private petSitterModalService: PetSitterModalService) {
    }

    @Action(OpenServicePetSitterModal)
    async openTutorModal(ctx: StateContext<ServicePetSitterModalStateModel>, {payload}: OpenServicePetSitterModal) {
        await this.petSitterModalService.open(payload);
    }

    @Action(CloseServicePetSitterModal)
    closeTutorModal(ctx: StateContext<ServicePetSitterModalStateModel>) {
        this.petSitterModalService.close();
    }

}
