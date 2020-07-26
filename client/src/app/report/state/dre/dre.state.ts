import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectDre,
    LoadPdf,
    LoadPdfSuccess,
    LoadPdfFail,
    LoadDres,
    LoadDresSuccess,
    LoadDresFail,
    CreateDre,
    CreateDreSuccess,
    CreateDreFail,
    UpdateDre,
    UpdateDreSuccess,
    UpdateDreFail,
    DeleteDre,
    DeleteDreSuccess,
    DeleteDreFail
} from './dre.actions';
import {CloseDreModal} from '../dre-modal/dre-modal.actions';

import {DreModel} from '../../../shared/models/dre.model';

import {DreResource} from '../../../shared/resources/dre.resource';

export class DreStateModel extends NgxsEntityStateStateModel<DreModel> {
    isLoading: boolean;
}

@State<DreStateModel>({
    name: 'dre',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class DreState {

    @Selector()
    static selected(state: DreStateModel) {
        return state.selected;
    }

    @Selector()
    static isLoading(state: DreStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: DreStateModel) {
        return state.entities;
    }

    constructor(private dreResource: DreResource,
                private toastController: ToastController) {
    }

    @Action(SelectDre)
    selectDre(ctx: StateContext<DreStateModel>, {payload}: SelectDre) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPdf)
    loadPdf(ctx: StateContext<DreStateModel>, {payload}: LoadPdf) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.dreResource.pdf(payload).pipe(
            map((Pdf: string) => ctx.dispatch(new LoadPdfSuccess(Pdf))),
            catchError((error) => ctx.dispatch(new LoadPdfFail(error)))
        );
    }

    @Action(LoadPdfSuccess)
    loadPdfSuccess(ctx: StateContext<DreStateModel>, {payload}: LoadPdfSuccess) {
        window.open(payload, '_blank');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPdfFail)
    loadPdfFail(ctx: StateContext<DreStateModel>, {payload}: LoadPdfFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadDres)
    loadDres(ctx: StateContext<DreStateModel>, {payload}: LoadDres) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.dreResource.find(payload).pipe(
            map((Dre: DreModel) => ctx.dispatch(new LoadDresSuccess(Dre))),
            catchError((error) => ctx.dispatch(new LoadDresFail(error)))
        );
    }

    @Action(LoadDresSuccess)
    loadDresSuccess(ctx: StateContext<DreStateModel>, {payload}: LoadDresSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadDresFail)
    loadDresFail(ctx: StateContext<DreStateModel>, {payload}: LoadDresFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateDre)
    createDre(ctx: StateContext<DreStateModel>, action: CreateDre) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.dreResource.create(action.payload).pipe(
            map((Dre: DreModel) => ctx.dispatch(new CreateDreSuccess(Dre))),
            catchError((error) => ctx.dispatch(new CreateDreFail(error)))
        );
    }

    @Action(CreateDreSuccess)
    createDreSuccess(ctx: StateContext<DreStateModel>, {payload}: CreateDreSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Dre cadastrado com sucesso!');
        ctx.dispatch(new SelectDre(payload));
        ctx.dispatch(new CloseDreModal());
    }

    @Action(CreateDreFail)
    createDreFail(ctx: StateContext<DreStateModel>, {payload}: CreateDreFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateDre)
    updateDre(ctx: StateContext<DreStateModel>, action: UpdateDre) {
        ctx.patchState({isLoading: true});
        return this.dreResource.update(action.payload).pipe(
            map((Dre: DreModel) => ctx.dispatch(new UpdateDreSuccess(Dre))),
            catchError((error) => ctx.dispatch(new UpdateDreFail(error)))
        );
    }

    @Action(UpdateDreSuccess)
    updateDreSuccess(ctx: StateContext<DreStateModel>, {payload}: UpdateDreSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Dre atualizado com sucesso!');
        ctx.dispatch(new CloseDreModal());
    }

    @Action(UpdateDreFail)
    updateDreFail(ctx: StateContext<DreStateModel>, {payload}: UpdateDreFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteDre)
    deleteDre(ctx: StateContext<DreStateModel>, action: DeleteDre) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.dreResource.destroy(action.payload).pipe(
            map((Dre: DreModel) => ctx.dispatch(new DeleteDreSuccess(Dre))),
            catchError((error) => ctx.dispatch(new DeleteDreFail(error)))
        );
    }

    @Action(DeleteDreSuccess)
    deleteDreSuccess(ctx: StateContext<DreStateModel>, {payload}: DeleteDreSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Dre excluído com sucesso!');
    }

    @Action(DeleteDreFail)
    deleteDreFail(ctx: StateContext<DreStateModel>, {payload}: DeleteDreFail) {
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
