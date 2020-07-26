import {Injectable} from '@angular/core';

import {Store, Select} from '@ngxs/store';

import {Observable} from 'rxjs';

import {NfceSelectors} from './state/nfce/nfce.selectors';
import {NfseSelectors} from './state/nfse/nfse.selectors';

import {
    SelectNfce,
    LoadNfces,
    CreateNfce,
    UpdateNfce,
    DeleteNfce,
} from './state/nfce/nfce.actions';
import {
    SelectNfse,
    LoadNfses,
    CreateNfse,
    UpdateNfse,
    DeleteNfse,
} from './state/nfse/nfse.actions';

import {NfceModel} from '../shared/models/nfce.model';
import {NfseModel} from '../shared/models/nfse.model';

@Injectable({
    providedIn: 'root',
})
export class InvoiceSandbox {
    @Select(NfceSelectors.entities) nfcesCollection$: Observable<NfceModel[]>;

    @Select(NfceSelectors.selected) nfceSelected$: Observable<NfceModel>;

    @Select(NfceSelectors.isLoading) isLoadingNfce$: Observable<boolean>;

    @Select(NfceSelectors.paginator) paginatorNfce$: Observable<any>;

    @Select(NfseSelectors.entities) nfsesCollection$: Observable<NfseModel[]>;

    @Select(NfseSelectors.selected) nfseSelected$: Observable<NfseModel>;

    @Select(NfseSelectors.isLoading) isLoadingNfse$: Observable<boolean>;

    @Select(NfseSelectors.paginator) paginatorNfse$: Observable<any>;

    constructor(private store: Store) {}

    public selectNfce(Nfce: NfceModel) {
        this.store.dispatch(new SelectNfce(Nfce));
    }

    public loadNfces(page: number) {
        this.store.dispatch(new LoadNfces(page));
    }

    public createNfce(Nfce: NfceModel) {
        this.store.dispatch(new CreateNfce(Nfce));
    }

    public updateNfce(Nfce: any) {
        this.store.dispatch(new UpdateNfce(Nfce));
    }

    public deleteNfce(Nfce: NfceModel) {
        this.store.dispatch(new DeleteNfce(Nfce));
    }

    public selectNfse(Nfse: NfseModel) {
        this.store.dispatch(new SelectNfse(Nfse));
    }

    public loadNfses(page: number) {
      this.store.dispatch(new LoadNfses(page));
    }

    public createNfse(Nfse: NfceModel) {
        this.store.dispatch(new CreateNfse(Nfse));
    }

    public updateNfse(Nfse: any) {
        this.store.dispatch(new UpdateNfse(Nfse));
    }

    public deleteNfse(Nfse: NfseModel) {
        this.store.dispatch(new DeleteNfse(Nfse));
    }
}
