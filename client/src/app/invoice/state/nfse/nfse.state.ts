import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {
    NgxsEntityStateAdapter,
    NgxsEntityStateStateModel,
} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectNfse,
    LoadNfses,
    LoadNfsesSuccess,
    LoadNfsesFail,
    CreateNfse,
    CreateNfseSuccess,
    CreateNfseFail,
    UpdateNfse,
    UpdateNfseSuccess,
    UpdateNfseFail,
    DeleteNfse,
    DeleteNfseSuccess,
    DeleteNfseFail,
} from './nfse.actions';

import {NfseModel} from '../../../shared/models/nfse.model';

import {NfseResource} from '../../../shared/resources/nfse.resource';

export class NfseStateModel extends NgxsEntityStateStateModel<NfseModel> {
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

@State<NfseStateModel>({
    name: 'nfse',
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
export class NfseState {
    @Selector()
    static selected(state: NfseStateModel) {
        return state.selected;
    }

    @Selector()
    static isLoading(state: NfseStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: NfseStateModel) {
        return state.entities;
    }

    @Selector()
    static paginator(state: NfseStateModel) {
      return state.paginator;
    }

    constructor(
        private nfseResource: NfseResource,
        private toastController: ToastController
    ) {}

    @Action(SelectNfse)
    selectNfse(ctx: StateContext<NfseStateModel>, {payload}: SelectNfse) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadNfses)
    loadNfses(ctx: StateContext<NfseStateModel>, {payload}: LoadNfses) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.nfseResource.find(payload).pipe(
            map((Nfse) => ctx.dispatch(new LoadNfsesSuccess(Nfse))),
            catchError((error) => ctx.dispatch(new LoadNfsesFail(error)))
        );
    }

    @Action(LoadNfsesSuccess)
    loadNfsesSuccess(
        ctx: StateContext<NfseStateModel>,
        {payload}: LoadNfsesSuccess
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

    @Action(LoadNfsesFail)
    loadNfsesFail(ctx: StateContext<NfseStateModel>, {payload}: LoadNfsesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateNfse)
    createNfse(ctx: StateContext<NfseStateModel>, action: CreateNfse) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.nfseResource.create(action.payload).pipe(
            map((Nfse: NfseModel) => ctx.dispatch(new CreateNfseSuccess(Nfse))),
            catchError((error) => ctx.dispatch(new CreateNfseFail(error)))
        );
    }

    @Action(CreateNfseSuccess)
    createNfseSuccess(
        ctx: StateContext<NfseStateModel>,
        {payload}: CreateNfseSuccess
    ) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Nfse cadastrado com sucesso!');
        ctx.dispatch(new SelectNfse(payload));
    }

    @Action(CreateNfseFail)
    createNfseFail(
        ctx: StateContext<NfseStateModel>,
        {payload}: CreateNfseFail
    ) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateNfse)
    updateNfse(ctx: StateContext<NfseStateModel>, action: UpdateNfse) {
        ctx.patchState({isLoading: true});
        return this.nfseResource.update(action.payload).pipe(
            map((Nfse: NfseModel) => ctx.dispatch(new UpdateNfseSuccess(Nfse))),
            catchError((error) => ctx.dispatch(new UpdateNfseFail(error)))
        );
    }

    @Action(UpdateNfseSuccess)
    updateNfseSuccess(
        ctx: StateContext<NfseStateModel>,
        {payload}: UpdateNfseSuccess
    ) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Nfse atualizado com sucesso!');
    }

    @Action(UpdateNfseFail)
    updateNfseFail(
        ctx: StateContext<NfseStateModel>,
        {payload}: UpdateNfseFail
    ) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteNfse)
    deleteNfse(ctx: StateContext<NfseStateModel>, action: DeleteNfse) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.nfseResource.destroy(action.payload).pipe(
            map((Nfse: NfseModel) => ctx.dispatch(new DeleteNfseSuccess(Nfse))),
            catchError((error) => ctx.dispatch(new DeleteNfseFail(error)))
        );
    }

    @Action(DeleteNfseSuccess)
    deleteNfseSuccess(
        ctx: StateContext<NfseStateModel>,
        {payload}: DeleteNfseSuccess
    ) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Nfse excluído com sucesso!');
    }

    @Action(DeleteNfseFail)
    deleteNfseFail(
        ctx: StateContext<NfseStateModel>,
        {payload}: DeleteNfseFail
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
