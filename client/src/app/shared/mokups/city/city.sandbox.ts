import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {CitySelectors} from './state/city.selectors';

import {LoadCities} from './state/city.actions';

import {CityModel} from '../../models/city.model';

@Injectable({
    providedIn: 'root'
})
export class CitySandbox {

    @Select(CitySelectors.entities) citiesCollection$: Observable<CityModel[]>;

    @Select(CitySelectors.selected) citySelected$: Observable<CityModel>;

    @Select(CitySelectors.isLoading) isLoading$: Observable<boolean>;

    constructor(private store: Store) {
    }

    public async loadCities(province) {
        await this.store.dispatch(new LoadCities(province));
    }
}
