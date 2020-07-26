import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectHoliday,
    CreateHoliday,
    CreateHolidayFail,
    CreateHolidaySuccess,
    LoadHolidays,
    LoadHolidaysFail,
    LoadHolidaysSuccess,
    UpdateHoliday,
    UpdateHolidayFail,
    UpdateHolidaySuccess,
    DeleteHoliday,
    DeleteHolidayFail,
    DeleteHolidaySuccess
} from './holiday.actions';

import {HolidayModel} from '../../../shared/models/holiday.model';

import {HolidayResource} from '../../../shared/resources/holiday.resource';

export class HolidayStateModel extends NgxsEntityStateStateModel<HolidayModel> {
    isLoading: boolean;
}

@State<HolidayStateModel>({
    name: 'holiday',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class HolidayState {

    @Selector()
    static selected(state: HolidayStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: HolidayStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: HolidayStateModel) {
        return state.entities;
    }

    constructor(private holidayResource: HolidayResource,
                private toastController: ToastController) {
    }

    @Action(SelectHoliday)
    selectHoliday(ctx: StateContext<HolidayStateModel>, {payload}: SelectHoliday) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadHolidays)
    loadHolidays(ctx: StateContext<HolidayStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.holidayResource.find().pipe(
            map((Unity: HolidayModel[]) => ctx.dispatch(new LoadHolidaysSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadHolidaysFail(error)))
        );
    }

    @Action(LoadHolidaysSuccess)
    loadHolidaysSuccess(ctx: StateContext<HolidayStateModel>, {payload}: LoadHolidaysSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadHolidaysFail)
    loadHolidaysFail(ctx: StateContext<HolidayStateModel>, {payload}: LoadHolidaysFail) {
        console.warn(`Occorreu um erro ao carregar os tamanhos ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateHoliday)
    createHoliday(ctx: StateContext<HolidayStateModel>, action: CreateHoliday) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.holidayResource.create(action.payload).pipe(
            map((Holidays: HolidayModel[]) => ctx.dispatch(new CreateHolidaySuccess(Holidays))),
            catchError((error) => ctx.dispatch(new CreateHolidayFail(error)))
        );
    }

    @Action(CreateHolidaySuccess)
    createHolidaySuccess(ctx: StateContext<HolidayStateModel>, {payload}: CreateHolidaySuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Ajuste realizado com sucesso!');
    }

    @Action(CreateHolidayFail)
    createHolidayFail(ctx: StateContext<HolidayStateModel>, {payload}: CreateHolidayFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateHoliday)
    updateHoliday(ctx: StateContext<HolidayStateModel>, action: UpdateHoliday) {
        ctx.patchState({isLoading: true});
        return this.holidayResource.update(action.payload).pipe(
            map((Holiday: HolidayModel) => ctx.dispatch(new UpdateHolidaySuccess(Holiday))),
            catchError((error) => ctx.dispatch(new UpdateHolidayFail(error)))
        );
    }

    @Action(UpdateHolidaySuccess)
    updateHolidaySuccess(ctx: StateContext<HolidayStateModel>, {payload}: UpdateHolidaySuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Feriado atualizado com sucesso!');
    }

    @Action(UpdateHolidayFail)
    updateHolidayFail(ctx: StateContext<HolidayStateModel>, {payload}: UpdateHolidayFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteHoliday)
    deleteHoliday(ctx: StateContext<HolidayStateModel>, action: DeleteHoliday) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.holidayResource.destroy(action.payload).pipe(
            map((Holiday: HolidayModel) => ctx.dispatch(new DeleteHolidaySuccess(Holiday))),
            catchError((error) => ctx.dispatch(new DeleteHolidayFail(error)))
        );
    }

    @Action(DeleteHolidaySuccess)
    deleteHolidaySuccess(ctx: StateContext<HolidayStateModel>, {payload}: DeleteHolidaySuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Feriado excluído com sucesso!');
    }

    @Action(DeleteHolidayFail)
    deleteHolidayFail(ctx: StateContext<HolidayStateModel>, {payload}: DeleteHolidayFail) {
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
