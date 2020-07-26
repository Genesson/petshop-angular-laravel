import {Injectable} from '@angular/core';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../libs/ngxs-entity-state/src/lib';

import {
    LoadProvinces,
    LoadProvincesFail,
    LoadProvincesSuccess
} from '../../province/state/province.actions';

import {ProvinceModel} from '../../../models/province.model';

import {ProvinceResource} from '../../../resources/province.resource';

export class ProvinceStateModel extends NgxsEntityStateStateModel<ProvinceModel> {
    isLoading: boolean;
}

@State<ProvinceStateModel>({
    name: 'province',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class ProvinceState {

    @Selector()
    static selected(state: ProvinceStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: ProvinceStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: ProvinceStateModel) {
        return state.entities;
    }

    constructor(private provinceResource: ProvinceResource) {
    }

    @Action(LoadProvinces)
    loadProvinces(ctx: StateContext<ProvinceStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.provinceResource.find().pipe(
            map((Unity: ProvinceModel[]) => ctx.dispatch(new LoadProvincesSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadProvincesFail(error)))
        );
    }

    @Action(LoadProvincesSuccess)
    loadProvincesSuccess(ctx: StateContext<ProvinceStateModel>, {payload}: LoadProvincesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadProvincesFail)
    loadProvincesFail(ctx: StateContext<ProvinceStateModel>, {payload}: LoadProvincesFail) {
        console.warn(`Occorreu um erro ao carregar os estados ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }
}
