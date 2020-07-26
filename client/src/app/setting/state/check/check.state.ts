import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectCheck,
    LoadChecks,
    LoadChecksSuccess,
    LoadChecksFail,
    CreateCheck,
    CreateCheckSuccess,
    CreateCheckFail,
    UpdateCheck,
    UpdateCheckSuccess,
    UpdateCheckFail,
    DeleteCheck,
    DeleteCheckSuccess,
    DeleteCheckFail
} from './check.actions';
import {CloseCheckModal} from '../check-modal/check-modal.actions';

import {CheckModel} from '../../../shared/models/check.model';

import {CheckResource} from '../../../shared/resources/check.resource';

export class CheckStateModel extends NgxsEntityStateStateModel<CheckModel> {
    isLoading: boolean;
}

@State<CheckStateModel>({
    name: 'check',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class CheckState {

    @Selector()
    static selected(state: CheckStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: CheckStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: CheckStateModel) {
        return state.entities;
    }

    constructor(private checkResource: CheckResource,
                private toastController: ToastController) {
    }

    @Action(SelectCheck)
    selectCheck(ctx: StateContext<CheckStateModel>, {payload}: SelectCheck) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadChecks)
    loadChecks(ctx: StateContext<CheckStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.checkResource.find().pipe(
            map((Check: CheckModel[]) => ctx.dispatch(new LoadChecksSuccess(Check))),
            catchError((error) => ctx.dispatch(new LoadChecksFail(error)))
        );
    }

    @Action(LoadChecksSuccess)
    loadChecksSuccess(ctx: StateContext<CheckStateModel>, {payload}: LoadChecksSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadChecksFail)
    loadChecksFail(ctx: StateContext<CheckStateModel>, {payload}: LoadChecksFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateCheck)
    createCheck(ctx: StateContext<CheckStateModel>, action: CreateCheck) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.checkResource.create(action.payload).pipe(
            map((Check: CheckModel) => ctx.dispatch(new CreateCheckSuccess(Check))),
            catchError((error) => ctx.dispatch(new CreateCheckFail(error)))
        );
    }

    @Action(CreateCheckSuccess)
    createCheckSuccess(ctx: StateContext<CheckStateModel>, {payload}: CreateCheckSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Horário cadastrado com sucesso!');
        ctx.dispatch(new SelectCheck(payload));
        ctx.dispatch(new CloseCheckModal());
    }

    @Action(CreateCheckFail)
    createCheckFail(ctx: StateContext<CheckStateModel>, {payload}: CreateCheckFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateCheck)
    updateCheck(ctx: StateContext<CheckStateModel>, action: UpdateCheck) {
        ctx.patchState({isLoading: true});
        return this.checkResource.update(action.payload).pipe(
            map((Check: CheckModel) => ctx.dispatch(new UpdateCheckSuccess(Check))),
            catchError((error) => ctx.dispatch(new UpdateCheckFail(error)))
        );
    }

    @Action(UpdateCheckSuccess)
    updateCheckSuccess(ctx: StateContext<CheckStateModel>, {payload}: UpdateCheckSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Horário atualizado com sucesso!');
        ctx.dispatch(new CloseCheckModal());
    }

    @Action(UpdateCheckFail)
    updateCheckFail(ctx: StateContext<CheckStateModel>, {payload}: UpdateCheckFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteCheck)
    deleteCheck(ctx: StateContext<CheckStateModel>, action: DeleteCheck) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.checkResource.destroy(action.payload).pipe(
            map((Check: CheckModel) => ctx.dispatch(new DeleteCheckSuccess(Check))),
            catchError((error) => ctx.dispatch(new DeleteCheckFail(error)))
        );
    }

    @Action(DeleteCheckSuccess)
    deleteCheckSuccess(ctx: StateContext<CheckStateModel>, {payload}: DeleteCheckSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Horário excluído com sucesso!');
    }

    @Action(DeleteCheckFail)
    deleteCheckFail(ctx: StateContext<CheckStateModel>, {payload}: DeleteCheckFail) {
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
