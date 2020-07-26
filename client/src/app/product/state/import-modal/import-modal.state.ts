import {Action, State, StateContext} from '@ngxs/store';

import {OpenImportModal, CloseImportModal} from './import-modal.actions';

import {ImportModalService} from '../../services/import-modal.service';

export interface ImportModalStateModel {
    isLoading: boolean;
}

@State<ImportModalStateModel>({
    name: 'importModal',
    defaults: {
        isLoading: false
    }
})

export class ImportModalState {

    constructor(private importModalService: ImportModalService) {
    }

    @Action(OpenImportModal)
    async openTutorModal(ctx: StateContext<ImportModalStateModel>) {
        await this.importModalService.open();
    }

    @Action(CloseImportModal)
    closeTutorModal(ctx: StateContext<ImportModalStateModel>) {
        this.importModalService.close();
    }

}
