import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {
    NgxsEntityStateAdapter,
    NgxsEntityStateStateModel,
} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectNfce,
    LoadNfces,
    LoadNfcesSuccess,
    LoadNfcesFail,
    CreateNfce,
    CreateNfceSuccess,
    CreateNfceFail,
    UpdateNfce,
    UpdateNfceSuccess,
    UpdateNfceFail,
    DeleteNfce,
    DeleteNfceSuccess,
    DeleteNfceFail,
} from './nfce.actions';

import {NfceModel} from '../../../shared/models/nfce.model';

import {NfceResource} from '../../../shared/resources/nfce.resource';

export class NfceStateModel extends NgxsEntityStateStateModel<NfceModel> {
    isLoading: boolean;
    paginator: {
      first_page_url: number,
      prev_page_url: number,
      current_page: number,
      next_page_url: number,
      from: number,
      per_page: number,
      to: number
    };
}

@State<NfceStateModel>({
    name: 'nfce',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false,
        paginator: {
          first_page_url: null,
          prev_page_url: null,
          current_page: null,
          next_page_url: null,
          from: null,
          per_page: null,
          to: null
        }
    },
})
@Injectable()
export class NfceState {
    @Selector()
    static selected(state: NfceStateModel) {
        return state.selected;
    }

    @Selector()
    static isLoading(state: NfceStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: NfceStateModel) {
        return state.entities;
    }

    @Selector()
    static paginator(state: NfceStateModel) {
      return state.paginator;
    }

    constructor(
        private nfceResource: NfceResource,
        private toastController: ToastController
    ) {}

    @Action(SelectNfce)
    selectNfce(ctx: StateContext<NfceStateModel>, {payload}: SelectNfce) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadNfces)
    loadNfces(ctx: StateContext<NfceStateModel>, {payload}: LoadNfces) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.nfceResource.find(payload).pipe(
            map((Nfce) => ctx.dispatch(new LoadNfcesSuccess(Nfce))),
            catchError((error) => ctx.dispatch(new LoadNfcesFail(error)))
        );
    }

    @Action(LoadNfcesSuccess)
    loadNfcesSuccess(
        ctx: StateContext<NfceStateModel>,
        {payload}: LoadNfcesSuccess
    ) {
        ctx.patchState({
          paginator: {
            first_page_url: (payload.data.first_page_url) ?
              Number(payload.data.first_page_url.replace('https://api.kando-so.com.br/api/invoice?page=', '')) : null,
            prev_page_url: (payload.data.prev_page_url) ?
              Number(payload.data.prev_page_url.replace('https://api.kando-so.com.br/api/invoice?page=', '')) : null,
            current_page: payload.data.current_page,
            next_page_url: (payload.data.next_page_url) ?
              Number(payload.data.next_page_url.replace('https://api.kando-so.com.br/api/invoice?page=', '')) : null,
            from: payload.data.from,
            per_page: payload.data.per_page,
            to: payload.data.to
          }
        });
        NgxsEntityStateAdapter.addAll(payload.data.data, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadNfcesFail)
    loadNfcesFail(ctx: StateContext<NfceStateModel>, {payload}: LoadNfcesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateNfce)
    createNfce(ctx: StateContext<NfceStateModel>, action: CreateNfce) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.nfceResource.create(action.payload).pipe(
            map((Nfce: NfceModel) => ctx.dispatch(new CreateNfceSuccess(Nfce))),
            catchError((error) => ctx.dispatch(new CreateNfceFail(error)))
        );
    }

    @Action(CreateNfceSuccess)
    createNfceSuccess(
        ctx: StateContext<NfceStateModel>,
        {payload}: CreateNfceSuccess
    ) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Nfce cadastrado com sucesso!');
        ctx.dispatch(new SelectNfce(payload));
    }

    @Action(CreateNfceFail)
    createNfceFail(
        ctx: StateContext<NfceStateModel>,
        {payload}: CreateNfceFail
    ) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateNfce)
    updateNfce(ctx: StateContext<NfceStateModel>, action: UpdateNfce) {
        ctx.patchState({isLoading: true});
        return this.nfceResource.update(action.payload).pipe(
            map((Nfce: NfceModel) => ctx.dispatch(new UpdateNfceSuccess(Nfce))),
            catchError((error) => ctx.dispatch(new UpdateNfceFail(error)))
        );
    }

    @Action(UpdateNfceSuccess)
    updateNfceSuccess(
        ctx: StateContext<NfceStateModel>,
        {payload}: UpdateNfceSuccess
    ) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Nfce atualizado com sucesso!');
    }

    @Action(UpdateNfceFail)
    updateNfceFail(
        ctx: StateContext<NfceStateModel>,
        {payload}: UpdateNfceFail
    ) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteNfce)
    deleteNfce(ctx: StateContext<NfceStateModel>, action: DeleteNfce) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.nfceResource.destroy(action.payload).pipe(
            map((Nfce: NfceModel) => ctx.dispatch(new DeleteNfceSuccess(Nfce))),
            catchError((error) => ctx.dispatch(new DeleteNfceFail(error)))
        );
    }

    @Action(DeleteNfceSuccess)
    deleteNfceSuccess(
        ctx: StateContext<NfceStateModel>,
        {payload}: DeleteNfceSuccess
    ) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Nfce excluído com sucesso!');
    }

    @Action(DeleteNfceFail)
    deleteNfceFail(
        ctx: StateContext<NfceStateModel>,
        {payload}: DeleteNfceFail
    ) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    async presentToast(msg, type: string = 'success') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: type,
        });
        toast.present();
    }
}
