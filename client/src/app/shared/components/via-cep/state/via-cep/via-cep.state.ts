import {Injectable} from '@angular/core';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {ResetViaCep, GetViaCep, GetViaCepFail, GetViaCepSuccess} from './via-cep.actions';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../../libs/ngxs-entity-state/src/lib';

import {ViaCepService} from '../../services/via-cep.service';

import {ViaCepModel} from '../../../../models/via-cep.model';

export class ViaCepStateModel extends NgxsEntityStateStateModel<ViaCepModel> {
    isLoading: boolean;
}

@State<ViaCepStateModel>({
    name: 'viaCep',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class ViaCepState {

    @Selector()
    static selected(state: ViaCepStateModel) {
        return state.selected;
    }

    @Selector()
    static entities(state: ViaCepStateModel) {
        return state.entities;
    }

    constructor(private viacepService: ViaCepService) {
    }

    @Action(ResetViaCep)
    resetViaCep(ctx: StateContext<ViaCepStateModel>) {
        NgxsEntityStateAdapter.select(null, ctx);
    }

    @Action(GetViaCep)
    openModalProfile(ctx: StateContext<ViaCepStateModel>, {payload}: GetViaCep) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.viacepService.find(payload).pipe(
            map((ViaCep: ViaCepModel) => ctx.dispatch(new GetViaCepSuccess(ViaCep))),
            catchError((error) => ctx.dispatch(new GetViaCepFail(error)))
        );
    }

    @Action(GetViaCepSuccess)
    loadContractsSuccess(ctx: StateContext<ViaCepStateModel>, {payload}: GetViaCepSuccess) {
        NgxsEntityStateAdapter.select(payload[0], ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(GetViaCepFail)
    loadContractsFail(ctx: StateContext<ViaCepStateModel>, {payload}: GetViaCepFail) {
        console.warn(`Occorreu um erro ao carregar ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }
}
