import {Action, State, StateContext} from '@ngxs/store';

import {OpenExceptionDateModal, CloseExceptionDateModal} from './exception-date-modal.actions';

import {ExceptionDateModalService} from '../../services/exception-date-modal.service';

export interface ExceptionDateModalStateModel {
    isLoading: boolean;
}

@State<ExceptionDateModalStateModel>({
    name: 'exceptionDateModal',
    defaults: {
        isLoading: false
    }
})

export class ExceptionDateModalState {

    constructor(private exceptionDateModalService: ExceptionDateModalService) {
    }

    @Action(OpenExceptionDateModal)
    async openTutorModal(ctx: StateContext<ExceptionDateModalStateModel>, {payload}: OpenExceptionDateModal) {
        await this.exceptionDateModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseExceptionDateModal)
    closeTutorModal(ctx: StateContext<ExceptionDateModalStateModel>) {
        this.exceptionDateModalService.close();
    }

}
