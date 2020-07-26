import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectExceptionDate,
    LoadExceptionDates,
    LoadExceptionDatesFail,
    LoadExceptionDatesSuccess,
    CreateExceptionDate,
    CreateExceptionDateFail,
    CreateExceptionDateSuccess,
    UpdateExceptionDate,
    UpdateExceptionDateFail,
    UpdateExceptionDateSuccess,
    DeleteExceptionDate,
    DeleteExceptionDateFail,
    DeleteExceptionDateSuccess
} from './exception-date.actions';
import {CloseExceptionDateModal} from '../exception-date-modal/exception-date-modal.actions';

import {ExceptionDateModel} from '../../../shared/models/exception-date.model';

import {ExceptionDateResource} from '../../../shared/resources/exception-date.resource';

export class ExceptionDateStateModel extends NgxsEntityStateStateModel<ExceptionDateModel> {
    isLoading: boolean;
}

@State<ExceptionDateStateModel>({
    name: 'exceptionDate',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class ExceptionDateState {

    @Selector()
    static selected(state: ExceptionDateStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: ExceptionDateStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: ExceptionDateStateModel) {
        return state.entities;
    }

    constructor(private exceptionDateResource: ExceptionDateResource,
                private toastController: ToastController) {
    }

    @Action(SelectExceptionDate)
    selectExceptionDate(ctx: StateContext<ExceptionDateStateModel>, {payload}: SelectExceptionDate) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadExceptionDates)
    loadExceptionDates(ctx: StateContext<ExceptionDateStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.exceptionDateResource.find().pipe(
            map((Unity: ExceptionDateModel[]) => ctx.dispatch(new LoadExceptionDatesSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadExceptionDatesFail(error)))
        );
    }

    @Action(LoadExceptionDatesSuccess)
    loadExceptionDatesSuccess(ctx: StateContext<ExceptionDateStateModel>, {payload}: LoadExceptionDatesSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadExceptionDatesFail)
    loadExceptionDatesFail(ctx: StateContext<ExceptionDateStateModel>, {payload}: LoadExceptionDatesFail) {
        console.warn(`Occorreu um erro ao carregar os comportamentos ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateExceptionDate)
    createExceptionDate(ctx: StateContext<ExceptionDateStateModel>, action: CreateExceptionDate) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.exceptionDateResource.create(action.payload).pipe(
            map((ExceptionDate: ExceptionDateModel) => ctx.dispatch(new CreateExceptionDateSuccess(ExceptionDate))),
            catchError((error) => ctx.dispatch(new CreateExceptionDateFail(error)))
        );
    }

    @Action(CreateExceptionDateSuccess)
    createExceptionDateSuccess(ctx: StateContext<ExceptionDateStateModel>, {payload}: CreateExceptionDateSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Feriado cadastrado com sucesso!');
        ctx.dispatch(new SelectExceptionDate(payload));
        ctx.dispatch(new CloseExceptionDateModal());
    }

    @Action(CreateExceptionDateFail)
    createExceptionDateFail(ctx: StateContext<ExceptionDateStateModel>, {payload}: CreateExceptionDateFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateExceptionDate)
    updateExceptionDate(ctx: StateContext<ExceptionDateStateModel>, action: UpdateExceptionDate) {
        ctx.patchState({isLoading: true});
        return this.exceptionDateResource.update(action.payload).pipe(
            map((ExceptionDate: ExceptionDateModel) => ctx.dispatch(new UpdateExceptionDateSuccess(ExceptionDate))),
            catchError((error) => ctx.dispatch(new UpdateExceptionDateFail(error)))
        );
    }

    @Action(UpdateExceptionDateSuccess)
    updateExceptionDateSuccess(ctx: StateContext<ExceptionDateStateModel>, {payload}: UpdateExceptionDateSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Feriado atualizado com sucesso!');
        ctx.dispatch(new CloseExceptionDateModal());
    }

    @Action(UpdateExceptionDateFail)
    updateExceptionDateFail(ctx: StateContext<ExceptionDateStateModel>, {payload}: UpdateExceptionDateFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteExceptionDate)
    deleteExceptionDate(ctx: StateContext<ExceptionDateStateModel>, action: DeleteExceptionDate) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.exceptionDateResource.destroy(action.payload).pipe(
            map((ExceptionDate: ExceptionDateModel) => ctx.dispatch(new DeleteExceptionDateSuccess(ExceptionDate))),
            catchError((error) => ctx.dispatch(new DeleteExceptionDateFail(error)))
        );
    }

    @Action(DeleteExceptionDateSuccess)
    deleteExceptionDateSuccess(ctx: StateContext<ExceptionDateStateModel>, {payload}: DeleteExceptionDateSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Feriado excluído com sucesso!');
    }

    @Action(DeleteExceptionDateFail)
    deleteExceptionDateFail(ctx: StateContext<ExceptionDateStateModel>, {payload}: DeleteExceptionDateFail) {
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
