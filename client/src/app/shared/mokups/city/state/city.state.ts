import {Injectable} from '@angular/core';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../libs/ngxs-entity-state/src/lib';

import {
    LoadCities,
    LoadCitiesFail,
    LoadCitiesSuccess
} from '../../city/state/city.actions';

import {CityModel} from '../../../models/city.model';

import {CityResource} from '../../../resources/city.resource';

export class CityStateModel extends NgxsEntityStateStateModel<CityModel> {
    isLoading: boolean;
}

@State<CityStateModel>({
    name: 'city',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class CityState {

    @Selector()
    static selected(state: CityStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: CityStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: CityStateModel) {
        return state.entities;
    }

    constructor(private cityResource: CityResource) {
    }

    @Action(LoadCities)
    loadCities(ctx: StateContext<CityStateModel>, {payload}: LoadCities) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.cityResource.find(payload).pipe(
            map((Unity: CityModel[]) => ctx.dispatch(new LoadCitiesSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadCitiesFail(error)))
        );
    }

    @Action(LoadCitiesSuccess)
    loadCitiesSuccess(ctx: StateContext<CityStateModel>, {payload}: LoadCitiesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadCitiesFail)
    loadCitiesFail(ctx: StateContext<CityStateModel>, {payload}: LoadCitiesFail) {
        console.warn(`Occorreu um erro ao carregar as cidades ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }
}
