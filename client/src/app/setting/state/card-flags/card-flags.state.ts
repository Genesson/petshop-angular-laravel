import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectCardFlag,
    CreateCardFlag,
    CreateCardFlagFail,
    CreateCardFlagSuccess,
    LoadCardFlags,
    LoadCardFlagsFail,
    LoadCardFlagsSuccess,
    UpdateCardFlag,
    UpdateCardFlagFail,
    UpdateCardFlagSuccess,
    DeleteCardFlag,
    DeleteCardFlagFail,
    DeleteCardFlagSuccess
} from './card-flags.actions';
import {CloseCardFlagModal} from '../card-flags-modal/card-flags-modal.actions';

import {CardFlagModel} from '../../../shared/models/cardFlag.model';
import {CardFlagResource} from '../../../shared/resources/cardFlag.resource';

export class CardFlagsStateModel extends NgxsEntityStateStateModel<CardFlagModel> {
    isLoading: boolean;
}

@State<CardFlagsStateModel>({
    name: 'cardFlag',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class CardFlagsState {

    @Selector()
    static selected(state: CardFlagsStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: CardFlagsStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: CardFlagsStateModel) {
        return state.entities;
    }

    constructor(private cardFlagResource: CardFlagResource,
                private toastController: ToastController) {
    }

    @Action(SelectCardFlag)
    selectCardFlag(ctx: StateContext<CardFlagsStateModel>, {payload}: SelectCardFlag) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadCardFlags)
    loadCardFlags(ctx: StateContext<CardFlagsStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.cardFlagResource.find().pipe(
            map((Unity: CardFlagModel[]) => ctx.dispatch(new LoadCardFlagsSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadCardFlagsFail(error)))
        );
    }

    @Action(LoadCardFlagsSuccess)
    loadCardFlagsSuccess(ctx: StateContext<CardFlagsStateModel>, {payload}: LoadCardFlagsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadCardFlagsFail)
    loadCardFlagsFail(ctx: StateContext<CardFlagsStateModel>, {payload}: LoadCardFlagsFail) {
        console.warn(`Occorreu um erro ao carregar os tamanhos ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateCardFlag)
    createCardFlag(ctx: StateContext<CardFlagsStateModel>, action: CreateCardFlag) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.cardFlagResource.create(action.payload).pipe(
            map((CardFlag: CardFlagModel) => ctx.dispatch(new CreateCardFlagSuccess(CardFlag))),
            catchError((error) => ctx.dispatch(new CreateCardFlagFail(error)))
        );
    }

    @Action(CreateCardFlagSuccess)
    createCardFlagSuccess(ctx: StateContext<CardFlagsStateModel>, {payload}: CreateCardFlagSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Bandeira cadastrada com sucesso!');
        ctx.dispatch(new SelectCardFlag(payload));
        ctx.dispatch(new CloseCardFlagModal());
    }

    @Action(CreateCardFlagFail)
    createCardFlagFail(ctx: StateContext<CardFlagsStateModel>, {payload}: CreateCardFlagFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateCardFlag)
    updateCardFlag(ctx: StateContext<CardFlagsStateModel>, action: UpdateCardFlag) {
        ctx.patchState({isLoading: true});
        return this.cardFlagResource.update(action.payload).pipe(
            map((CardFlag: CardFlagModel) => ctx.dispatch(new UpdateCardFlagSuccess(CardFlag))),
            catchError((error) => ctx.dispatch(new UpdateCardFlagFail(error)))
        );
    }

    @Action(UpdateCardFlagSuccess)
    updateCardFlagSuccess(ctx: StateContext<CardFlagsStateModel>, {payload}: UpdateCardFlagSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Bandeira atualizada com sucesso!');
        ctx.dispatch(new CloseCardFlagModal());
    }

    @Action(UpdateCardFlagFail)
    updateCardFlagFail(ctx: StateContext<CardFlagsStateModel>, {payload}: UpdateCardFlagFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteCardFlag)
    deleteCardFlag(ctx: StateContext<CardFlagsStateModel>, action: DeleteCardFlag) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.cardFlagResource.destroy(action.payload).pipe(
            map((CardFlag: CardFlagModel) => ctx.dispatch(new DeleteCardFlagSuccess(CardFlag))),
            catchError((error) => ctx.dispatch(new DeleteCardFlagFail(error)))
        );
    }

    @Action(DeleteCardFlagSuccess)
    deleteCardFlagSuccess(ctx: StateContext<CardFlagsStateModel>, {payload}: DeleteCardFlagSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Bandeira excluída com sucesso!');
    }

    @Action(DeleteCardFlagFail)
    deleteCardFlagFail(ctx: StateContext<CardFlagsStateModel>, {payload}: DeleteCardFlagFail) {
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
