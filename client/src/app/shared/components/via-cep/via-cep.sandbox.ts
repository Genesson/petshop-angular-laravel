import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {ViaCepSelectors} from './state/via-cep/via-cep.selectors';

import {GetViaCep, ResetViaCep} from './state/via-cep/via-cep.actions';

import {ViaCepModel} from '../../models/via-cep.model';

@Injectable({
    providedIn: 'root'
})
export class ViaCepSandbox {

    @Select(ViaCepSelectors.entities) viaCepCollection$: Observable<ViaCepModel[]>;

    @Select(ViaCepSelectors.selected) viaCepSelected$: Observable<ViaCepModel>;

    constructor(private store: Store) {
    }

    public loadViaCep(cep) {
        this.store.dispatch(new GetViaCep(cep));
    }

    public resetViaCep() {
        this.store.dispatch(new ResetViaCep());
    }
}
