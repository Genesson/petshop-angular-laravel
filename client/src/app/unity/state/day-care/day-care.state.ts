import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectDayCare,
    LoadDayCares,
    LoadDayCaresSuccess,
    LoadDayCaresFail,
    LoadDayCaresUnity,
    LoadDayCaresUnitySuccess,
    LoadDayCaresUnityFail,
    CreateDayCare,
    CreateDayCareSuccess,
    CreateDayCareFail,
    UpdateDayCare,
    UpdateDayCareSuccess,
    UpdateDayCareFail,
    DeleteDayCare,
    DeleteDayCareSuccess,
    DeleteDayCareFail
} from './day-care.actions';
import {CloseDayCareModal} from '../day-care-modal/day-care-modal.actions';

import {ServiceModel} from '../../../shared/models/service.model';

import {ServiceResource} from '../../../shared/resources/service.resource';

export class DayCareStateModel extends NgxsEntityStateStateModel<ServiceModel> {
    isLoading: boolean;
}

@State<DayCareStateModel>({
    name: 'dayCare',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class DayCareState {

    @Selector()
    static selected(state: DayCareStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: DayCareStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: DayCareStateModel) {
        return state.entities;
    }

    constructor(private dayCareResource: ServiceResource,
                private toastController: ToastController) {
    }

    @Action(SelectDayCare)
    selectPaciente(ctx: StateContext<DayCareStateModel>, {payload}: SelectDayCare) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadDayCares)
    loadDayCares(ctx: StateContext<DayCareStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.dayCareResource.find().pipe(
            map((DayCare: ServiceModel[]) => ctx.dispatch(new LoadDayCaresSuccess(DayCare))),
            catchError((error) => ctx.dispatch(new LoadDayCaresFail(error)))
        );
    }

    @Action(LoadDayCaresSuccess)
    loadDayCaresSuccess(ctx: StateContext<DayCareStateModel>, {payload}: LoadDayCaresSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadDayCaresFail)
    loadDayCaresFail(ctx: StateContext<DayCareStateModel>, {payload}: LoadDayCaresFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadDayCaresUnity)
    loadDayCaresUnity(ctx: StateContext<DayCareStateModel>, {payload}: LoadDayCaresUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.dayCareResource.findDayCaresPerUnity(payload).pipe(
            map((DayCare: ServiceModel[]) => ctx.dispatch(new LoadDayCaresUnitySuccess(DayCare))),
            catchError((error) => ctx.dispatch(new LoadDayCaresUnityFail(error)))
        );
    }

    @Action(LoadDayCaresUnitySuccess)
    loadDayCaresUnitySuccess(ctx: StateContext<DayCareStateModel>, {payload}: LoadDayCaresUnitySuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadDayCaresUnityFail)
    loadDayCaresUnityFail(ctx: StateContext<DayCareStateModel>, {payload}: LoadDayCaresUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateDayCare)
    createDayCare(ctx: StateContext<DayCareStateModel>, action: CreateDayCare) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.dayCareResource.create(action.payload).pipe(
            map((DayCare: ServiceModel) => ctx.dispatch(new CreateDayCareSuccess(DayCare))),
            catchError((error) => ctx.dispatch(new CreateDayCareFail(error)))
        );
    }

    @Action(CreateDayCareSuccess)
    createDayCareSuccess(ctx: StateContext<DayCareStateModel>, {payload}: CreateDayCareSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Creche cadastrado com sucesso!');
        ctx.dispatch(new CloseDayCareModal());
    }

    @Action(CreateDayCareFail)
    createDayCareFail(ctx: StateContext<DayCareStateModel>, {payload}: CreateDayCareFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateDayCare)
    updateDayCare(ctx: StateContext<DayCareStateModel>, action: UpdateDayCare) {
        ctx.patchState({isLoading: true});
        return this.dayCareResource.update(action.payload).pipe(
            map((DayCare: ServiceModel) => ctx.dispatch(new UpdateDayCareSuccess(DayCare))),
            catchError((error) => ctx.dispatch(new UpdateDayCareFail(error)))
        );
    }

    @Action(UpdateDayCareSuccess)
    updateDayCareSuccess(ctx: StateContext<DayCareStateModel>, {payload}: UpdateDayCareSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Creche atualizado com sucesso!');
        ctx.dispatch(new CloseDayCareModal());
    }

    @Action(UpdateDayCareFail)
    updateDayCareFail(ctx: StateContext<DayCareStateModel>, {payload}: UpdateDayCareFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteDayCare)
    deleteDayCare(ctx: StateContext<DayCareStateModel>, action: DeleteDayCare) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.dayCareResource.destroy(action.payload).pipe(
            map((DayCare: ServiceModel) => ctx.dispatch(new DeleteDayCareSuccess(DayCare))),
            catchError((error) => ctx.dispatch(new DeleteDayCareFail(error)))
        );
    }

    @Action(DeleteDayCareSuccess)
    deleteDayCareSuccess(ctx: StateContext<DayCareStateModel>, {payload}: DeleteDayCareSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Creche excluído com sucesso!');
    }

    @Action(DeleteDayCareFail)
    deleteDayCareFail(ctx: StateContext<DayCareStateModel>, {payload}: DeleteDayCareFail) {
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
