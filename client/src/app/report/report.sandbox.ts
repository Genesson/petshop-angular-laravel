import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {DreSelectors} from './state/dre/dre.selectors';

import {
    SelectDre,
    LoadPdf,
    LoadDres,
    CreateDre,
    UpdateDre,
    DeleteDre,
} from './state/dre/dre.actions';
import {OpenDreModal, CloseDreModal} from './state/dre-modal/dre-modal.actions';

import {DreModel} from '../shared/models/dre.model';

@Injectable({
    providedIn: 'root',
})
export class ReportSandbox {

    @Select(DreSelectors.entities) dresCollection$: Observable<DreModel[]>;

    @Select(DreSelectors.selected) dreSelected$: Observable<DreModel>;

    @Select(DreSelectors.isLoading) isLoadingDre$: Observable<boolean>;

    constructor(private store: Store) {}

    public selectDre(Dre: DreModel) {
        this.store.dispatch(new SelectDre(Dre));
    }

    public loadPdf(date: string) {
        this.store.dispatch(new LoadPdf(date));
    }

    public loadDres(date: string) {
        this.store.dispatch(new LoadDres(date));
    }

    public createDre(Dre: DreModel) {
        this.store.dispatch(new CreateDre(Dre));
    }

    public updateDre(Dre: any) {
        this.store.dispatch(new UpdateDre(Dre));
    }

    public deleteDre(Dre: DreModel) {
        this.store.dispatch(new DeleteDre(Dre));
    }

    public openModal(editing, data?) {
        this.store.dispatch(new OpenDreModal({editing, data}));
    }

    public closeModal() {
        this.store.dispatch(new CloseDreModal());
    }
}
