import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectRegion,
    LoadRegions,
    LoadRegionsFail,
    LoadRegionsSuccess,
    CreateRegion,
    CreateRegionFail,
    CreateRegionSuccess,
    UpdateRegion,
    UpdateRegionFail,
    UpdateRegionSuccess,
    DeleteRegion,
    DeleteRegionFail,
    DeleteRegionSuccess
} from './region.actions';
import {CloseRegionModal} from '../region-modal/region-modal.actions';

import {RegionModel} from '../../../shared/models/region.model';

import {RegionResource} from '../../../shared/resources/region.resource';

export class RegionStateModel extends NgxsEntityStateStateModel<RegionModel> {
    isLoading: boolean;
}

@State<RegionStateModel>({
    name: 'region',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class RegionState {

    @Selector()
    static selected(state: RegionStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: RegionStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: RegionStateModel) {
        return state.entities;
    }

    constructor(private regionResource: RegionResource,
                private toastController: ToastController) {
    }

    @Action(SelectRegion)
    selectRegion(ctx: StateContext<RegionStateModel>, {payload}: SelectRegion) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadRegions)
    loadRegions(ctx: StateContext<RegionStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.regionResource.find().pipe(
            map((Region: RegionModel[]) => ctx.dispatch(new LoadRegionsSuccess(Region))),
            catchError((error) => ctx.dispatch(new LoadRegionsFail(error)))
        );
    }

    @Action(LoadRegionsSuccess)
    loadRegionsSuccess(ctx: StateContext<RegionStateModel>, {payload}: LoadRegionsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadRegionsFail)
    loadRegionsFail(ctx: StateContext<RegionStateModel>, {payload}: LoadRegionsFail) {
        console.warn(`Occorreu um erro ao carregar os comportamentos ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateRegion)
    createRegion(ctx: StateContext<RegionStateModel>, action: CreateRegion) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.regionResource.create(action.payload).pipe(
            map((Region: RegionModel[]) => ctx.dispatch(new CreateRegionSuccess(Region))),
            catchError((error) => ctx.dispatch(new CreateRegionFail(error)))
        );
    }

    @Action(CreateRegionSuccess)
    createRegionSuccess(ctx: StateContext<RegionStateModel>, {payload}: CreateRegionSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Região cadastrada com sucesso!');
        ctx.dispatch(new CloseRegionModal());
    }

    @Action(CreateRegionFail)
    createRegionFail(ctx: StateContext<RegionStateModel>, {payload}: CreateRegionFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateRegion)
    updateRegion(ctx: StateContext<RegionStateModel>, action: UpdateRegion) {
        ctx.patchState({isLoading: true});
        return this.regionResource.update(action.payload).pipe(
            map((Region: RegionModel[]) => ctx.dispatch(new UpdateRegionSuccess(Region))),
            catchError((error) => ctx.dispatch(new UpdateRegionFail(error)))
        );
    }

    @Action(UpdateRegionSuccess)
    updateRegionSuccess(ctx: StateContext<RegionStateModel>, {payload}: UpdateRegionSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Região atualizada com sucesso!');
        ctx.dispatch(new CloseRegionModal());
    }

    @Action(UpdateRegionFail)
    updateRegionFail(ctx: StateContext<RegionStateModel>, {payload}: UpdateRegionFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteRegion)
    deleteRegion(ctx: StateContext<RegionStateModel>, action: DeleteRegion) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.regionResource.destroy(action.payload).pipe(
            map((Region: RegionModel) => ctx.dispatch(new DeleteRegionSuccess(Region))),
            catchError((error) => ctx.dispatch(new DeleteRegionFail(error)))
        );
    }

    @Action(DeleteRegionSuccess)
    deleteRegionSuccess(ctx: StateContext<RegionStateModel>, {payload}: DeleteRegionSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Região excluída com sucesso!');
    }

    @Action(DeleteRegionFail)
    deleteRegionFail(ctx: StateContext<RegionStateModel>, {payload}: DeleteRegionFail) {
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
