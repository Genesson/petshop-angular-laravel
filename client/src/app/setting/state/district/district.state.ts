import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectDistrict,
    LoadDistricts,
    LoadDistrictsFail,
    LoadDistrictsSuccess,
    CreateDistrict,
    CreateDistrictFail,
    CreateDistrictSuccess,
    UpdateDistrict,
    UpdateDistrictFail,
    UpdateDistrictSuccess,
    DeleteDistrict,
    DeleteDistrictFail,
    DeleteDistrictSuccess
} from './district.actions';
import {CloseDistrictModal} from '../district-modal/district-modal.actions';

import {DistrictModel} from '../../../shared/models/district.model';

import {DistrictResource} from '../../../shared/resources/district.resource';

export class DistrictStateModel extends NgxsEntityStateStateModel<DistrictModel> {
    isLoading: boolean;
}

@State<DistrictStateModel>({
    name: 'district',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class DistrictState {

    @Selector()
    static selected(state: DistrictStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: DistrictStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: DistrictStateModel) {
        return state.entities;
    }

    constructor(private districtResource: DistrictResource,
                private toastController: ToastController) {
    }

    @Action(SelectDistrict)
    selectDistrict(ctx: StateContext<DistrictStateModel>, {payload}: SelectDistrict) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadDistricts)
    loadDistricts(ctx: StateContext<DistrictStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.districtResource.find().pipe(
            map((Unity: DistrictModel[]) => ctx.dispatch(new LoadDistrictsSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadDistrictsFail(error)))
        );
    }

    @Action(LoadDistrictsSuccess)
    loadDistrictsSuccess(ctx: StateContext<DistrictStateModel>, {payload}: LoadDistrictsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadDistrictsFail)
    loadDistrictsFail(ctx: StateContext<DistrictStateModel>, {payload}: LoadDistrictsFail) {
        console.warn(`Occorreu um erro ao carregar os comportamentos ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateDistrict)
    createDistrict(ctx: StateContext<DistrictStateModel>, action: CreateDistrict) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.districtResource.create(action.payload).pipe(
            map((District: DistrictModel) => ctx.dispatch(new CreateDistrictSuccess(District))),
            catchError((error) => ctx.dispatch(new CreateDistrictFail(error)))
        );
    }

    @Action(CreateDistrictSuccess)
    createDistrictSuccess(ctx: StateContext<DistrictStateModel>, {payload}: CreateDistrictSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Bairro cadastrado com sucesso!');
        ctx.dispatch(new SelectDistrict(payload));
        ctx.dispatch(new CloseDistrictModal());
    }

    @Action(CreateDistrictFail)
    createDistrictFail(ctx: StateContext<DistrictStateModel>, {payload}: CreateDistrictFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateDistrict)
    updateDistrict(ctx: StateContext<DistrictStateModel>, action: UpdateDistrict) {
        ctx.patchState({isLoading: true});
        return this.districtResource.update(action.payload).pipe(
            map((District: DistrictModel) => ctx.dispatch(new UpdateDistrictSuccess(District))),
            catchError((error) => ctx.dispatch(new UpdateDistrictFail(error)))
        );
    }

    @Action(UpdateDistrictSuccess)
    updateDistrictSuccess(ctx: StateContext<DistrictStateModel>, {payload}: UpdateDistrictSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Bairro atualizado com sucesso!');
        ctx.dispatch(new CloseDistrictModal());
    }

    @Action(UpdateDistrictFail)
    updateDistrictFail(ctx: StateContext<DistrictStateModel>, {payload}: UpdateDistrictFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteDistrict)
    deleteDistrict(ctx: StateContext<DistrictStateModel>, action: DeleteDistrict) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.districtResource.destroy(action.payload).pipe(
            map((District: DistrictModel) => ctx.dispatch(new DeleteDistrictSuccess(District))),
            catchError((error) => ctx.dispatch(new DeleteDistrictFail(error)))
        );
    }

    @Action(DeleteDistrictSuccess)
    deleteDistrictSuccess(ctx: StateContext<DistrictStateModel>, {payload}: DeleteDistrictSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Bairro excluído com sucesso!');
    }

    @Action(DeleteDistrictFail)
    deleteDistrictFail(ctx: StateContext<DistrictStateModel>, {payload}: DeleteDistrictFail) {
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
