import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    LoadDailyCalculation,
    LoadDailyCalculationSuccess,
    LoadDailyCalculationFail
} from './module-hotel.actions';

import {DailyResource} from '../../../shared/resources/daily.resource';

import {DailyModel} from '../../../shared/models/daily.model';

export class ModuleHotelStateModel extends NgxsEntityStateStateModel<DailyModel> {
    isLoading: boolean;
    daily: DailyModel;
}

@State<ModuleHotelStateModel>({
    name: 'moduleHotel',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false,
        daily: {days: 0, daily_amount: 0, hight_session_amount: 0, total_amount: 0}
    }
})
@Injectable()
export class ModuleHotelState {

    @Selector()
    static selected(state: ModuleHotelStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static entities(state: ModuleHotelStateModel) {
        return state.entities;
    }

    @Selector()
    static isLoading(state: ModuleHotelStateModel) {
        return state.isLoading;
    }

    @Selector()
    static daily(state: ModuleHotelStateModel) {
        return state.daily;
    }

    constructor(private dailyResource: DailyResource, private toastController: ToastController) {
    }

    @Action(LoadDailyCalculation)
    loadDailyCalculation(ctx: StateContext<ModuleHotelStateModel>, {payload}: LoadDailyCalculation) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.dailyResource.findOne(payload).pipe(
            map((daily) => ctx.dispatch(new LoadDailyCalculationSuccess(daily))),
            catchError((error) => ctx.dispatch(new LoadDailyCalculationFail(error)))
        );
    }

    @Action(LoadDailyCalculationSuccess)
    loadDailyCalculationSuccess(ctx: StateContext<ModuleHotelStateModel>, {payload}: LoadDailyCalculationSuccess) {
        ctx.patchState({daily: payload});
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadDailyCalculationFail)
    loadDailyCalculationFail(ctx: StateContext<ModuleHotelStateModel>, {payload}: LoadDailyCalculationFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    async presentToast(msg, type: string = 'success') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: type
        });
        toast.present();
    }
}
