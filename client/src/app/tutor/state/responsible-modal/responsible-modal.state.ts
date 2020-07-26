import {Action, State, StateContext} from '@ngxs/store';

import {OpenResponsibleModal, CloseResponsibleModal} from './responsible-modal.actions';

import {ResponsibleModalService} from '../../services/responsible-modal.service';

export interface ResponsibleModalStateModel {
    isLoading: boolean;
}

@State<ResponsibleModalStateModel>({
    name: 'responsibleModal',
    defaults: {
        isLoading: false
    }
})

export class ResponsibleModalState {

    constructor(private responsibleModalService: ResponsibleModalService) {
    }

    @Action(OpenResponsibleModal)
    async openTutorModal(ctx: StateContext<ResponsibleModalStateModel>, payload: OpenResponsibleModal) {
        await this.responsibleModalService.open(payload);
    }

    @Action(CloseResponsibleModal)
    closeTutorModal(ctx: StateContext<ResponsibleModalStateModel>) {
        this.responsibleModalService.close();
    }

}
