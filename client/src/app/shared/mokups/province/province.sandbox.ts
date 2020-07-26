import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {ProvinceSelectors} from './state/province.selectors';

import {LoadProvinces} from './state/province.actions';

import {ProvinceModel} from '../../models/province.model';

@Injectable({
    providedIn: 'root'
})
export class ProvinceSandbox {

    @Select(ProvinceSelectors.entities) provincesCollection$: Observable<ProvinceModel[]>;

    @Select(ProvinceSelectors.selected) provinceSelected$: Observable<ProvinceModel>;

    @Select(ProvinceSelectors.isLoading) isLoading$: Observable<boolean>;

    constructor(private store: Store) {
    }

    public async loadProvinces() {
        await this.store.dispatch(new LoadProvinces());
    }
}
