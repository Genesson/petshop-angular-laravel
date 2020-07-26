import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectPriceVariation,
    LoadPriceVariations,
    LoadPriceVariationsSuccess,
    LoadPriceVariationsFail,
    CreatePriceVariation,
    CreatePriceVariationSuccess,
    CreatePriceVariationFail,
    UpdatePriceVariation,
    UpdatePriceVariationSuccess,
    UpdatePriceVariationFail,
    DeletePriceVariation,
    DeletePriceVariationSuccess,
    DeletePriceVariationFail
} from './price-variation.actions';
import {ClosePriceVariationModal} from '../price-variation-modal/price-variation-modal.actions';

import {PriceVariationModel} from '../../../shared/models/price-variation.model';

import {PriceVariationResource} from '../../../shared/resources/price-variation.resource';

export class PriceVariationStateModel extends NgxsEntityStateStateModel<PriceVariationModel> {
    isLoading: boolean;
}

@State<PriceVariationStateModel>({
    name: 'priceVariation',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})
@Injectable()
export class PriceVariationState {

    @Selector()
    static selected(state: PriceVariationStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PriceVariationStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PriceVariationStateModel) {
        return state.entities;
    }

    constructor(private priceVariationResource: PriceVariationResource,
                private toastController: ToastController) {
    }

    @Action(SelectPriceVariation)
    selectPriceVariation(ctx: StateContext<PriceVariationStateModel>, {payload}: SelectPriceVariation) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPriceVariations)
    loadPriceVariations(ctx: StateContext<PriceVariationStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.priceVariationResource.find().pipe(
            map((PriceVariation: PriceVariationModel[]) => ctx.dispatch(new LoadPriceVariationsSuccess(PriceVariation))),
            catchError((error) => ctx.dispatch(new LoadPriceVariationsFail(error)))
        );
    }

    @Action(LoadPriceVariationsSuccess)
    loadPriceVariationsSuccess(ctx: StateContext<PriceVariationStateModel>, {payload}: LoadPriceVariationsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPriceVariationsFail)
    loadPriceVariationsFail(ctx: StateContext<PriceVariationStateModel>, {payload}: LoadPriceVariationsFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreatePriceVariation)
    createPriceVariation(ctx: StateContext<PriceVariationStateModel>, action: CreatePriceVariation) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.priceVariationResource.create(action.payload).pipe(
            map((PriceVariation: PriceVariationModel) => ctx.dispatch(new CreatePriceVariationSuccess(PriceVariation))),
            catchError((error) => ctx.dispatch(new CreatePriceVariationFail(error)))
        );
    }

    @Action(CreatePriceVariationSuccess)
    createPriceVariationSuccess(ctx: StateContext<PriceVariationStateModel>, {payload}: CreatePriceVariationSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Valores Alta Temporada cadastrado com sucesso!');
        ctx.dispatch(new SelectPriceVariation(payload));
        ctx.dispatch(new ClosePriceVariationModal());
    }

    @Action(CreatePriceVariationFail)
    createPriceVariationFail(ctx: StateContext<PriceVariationStateModel>, {payload}: CreatePriceVariationFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdatePriceVariation)
    updatePriceVariation(ctx: StateContext<PriceVariationStateModel>, action: UpdatePriceVariation) {
        ctx.patchState({isLoading: true});
        return this.priceVariationResource.update(action.payload).pipe(
            map((PriceVariation: PriceVariationModel) => ctx.dispatch(new UpdatePriceVariationSuccess(PriceVariation))),
            catchError((error) => ctx.dispatch(new UpdatePriceVariationFail(error)))
        );
    }

    @Action(UpdatePriceVariationSuccess)
    updatePriceVariationSuccess(ctx: StateContext<PriceVariationStateModel>, {payload}: UpdatePriceVariationSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Valores Alta Temporada atualizado com sucesso!');
        ctx.dispatch(new ClosePriceVariationModal());
    }

    @Action(UpdatePriceVariationFail)
    updatePriceVariationFail(ctx: StateContext<PriceVariationStateModel>, {payload}: UpdatePriceVariationFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeletePriceVariation)
    deletePriceVariation(ctx: StateContext<PriceVariationStateModel>, action: DeletePriceVariation) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.priceVariationResource.destroy(action.payload).pipe(
            map((PriceVariation: PriceVariationModel) => ctx.dispatch(new DeletePriceVariationSuccess(PriceVariation))),
            catchError((error) => ctx.dispatch(new DeletePriceVariationFail(error)))
        );
    }

    @Action(DeletePriceVariationSuccess)
    deletePriceVariationSuccess(ctx: StateContext<PriceVariationStateModel>, {payload}: DeletePriceVariationSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Valores Alta Temporada excluído com sucesso!');
    }

    @Action(DeletePriceVariationFail)
    deletePriceVariationFail(ctx: StateContext<PriceVariationStateModel>, {payload}: DeletePriceVariationFail) {
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
