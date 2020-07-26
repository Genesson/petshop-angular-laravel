import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectHotel,
    LoadHotels,
    LoadHotelsSuccess,
    LoadHotelsFail,
    LoadHotelsUnity,
    LoadHotelsUnitySuccess,
    LoadHotelsUnityFail,
    CreateHotel,
    CreateHotelSuccess,
    CreateHotelFail,
    UpdateHotel,
    UpdateHotelSuccess,
    UpdateHotelFail,
    DeleteHotel,
    DeleteHotelSuccess,
    DeleteHotelFail
} from './hotel.actions';
import {CloseHotelModal} from '../hotel-modal/hotel-modal.actions';

import {ServiceModel} from '../../../shared/models/service.model';

import {ServiceResource} from '../../../shared/resources/service.resource';

export class HotelStateModel extends NgxsEntityStateStateModel<ServiceModel> {
    isLoading: boolean;
}

@State<HotelStateModel>({
    name: 'hotel',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class HotelState {

    @Selector()
    static selected(state: HotelStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: HotelStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: HotelStateModel) {
        return state.entities;
    }

    constructor(private hotelResource: ServiceResource,
                private toastController: ToastController) {
    }

    @Action(SelectHotel)
    selectPaciente(ctx: StateContext<HotelStateModel>, {payload}: SelectHotel) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadHotels)
    loadHotels(ctx: StateContext<HotelStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.hotelResource.find().pipe(
            map((Hotel: ServiceModel[]) => ctx.dispatch(new LoadHotelsSuccess(Hotel))),
            catchError((error) => ctx.dispatch(new LoadHotelsFail(error)))
        );
    }

    @Action(LoadHotelsSuccess)
    loadHotelsSuccess(ctx: StateContext<HotelStateModel>, {payload}: LoadHotelsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadHotelsFail)
    loadHotelsFail(ctx: StateContext<HotelStateModel>, {payload}: LoadHotelsFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadHotelsUnity)
    loadHotelsUnity(ctx: StateContext<HotelStateModel>, {payload}: LoadHotelsUnity) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.hotelResource.findHotelsPerUnity(payload).pipe(
            map((Hotel: ServiceModel[]) => ctx.dispatch(new LoadHotelsUnitySuccess(Hotel))),
            catchError((error) => ctx.dispatch(new LoadHotelsUnityFail(error)))
        );
    }

    @Action(LoadHotelsUnitySuccess)
    loadHotelsUnitySuccess(ctx: StateContext<HotelStateModel>, {payload}: LoadHotelsUnitySuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadHotelsUnityFail)
    loadHotelsUnityFail(ctx: StateContext<HotelStateModel>, {payload}: LoadHotelsUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateHotel)
    createHotel(ctx: StateContext<HotelStateModel>, action: CreateHotel) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.hotelResource.create(action.payload).pipe(
            map((Hotel: ServiceModel) => ctx.dispatch(new CreateHotelSuccess(Hotel))),
            catchError((error) => ctx.dispatch(new CreateHotelFail(error)))
        );
    }

    @Action(CreateHotelSuccess)
    createHotelSuccess(ctx: StateContext<HotelStateModel>, {payload}: CreateHotelSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Hotel cadastrado com sucesso!');
        ctx.dispatch(new CloseHotelModal());
    }

    @Action(CreateHotelFail)
    createHotelFail(ctx: StateContext<HotelStateModel>, {payload}: CreateHotelFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateHotel)
    updateHotel(ctx: StateContext<HotelStateModel>, action: UpdateHotel) {
        ctx.patchState({isLoading: true});
        return this.hotelResource.update(action.payload).pipe(
            map((Hotel: ServiceModel) => ctx.dispatch(new UpdateHotelSuccess(Hotel))),
            catchError((error) => ctx.dispatch(new UpdateHotelFail(error)))
        );
    }

    @Action(UpdateHotelSuccess)
    updateHotelSuccess(ctx: StateContext<HotelStateModel>, {payload}: UpdateHotelSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Hotel atualizado com sucesso!');
        ctx.dispatch(new CloseHotelModal());
    }

    @Action(UpdateHotelFail)
    updateHotelFail(ctx: StateContext<HotelStateModel>, {payload}: UpdateHotelFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteHotel)
    deleteHotel(ctx: StateContext<HotelStateModel>, action: DeleteHotel) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.hotelResource.destroy(action.payload).pipe(
            map((Hotel: ServiceModel) => ctx.dispatch(new DeleteHotelSuccess(Hotel))),
            catchError((error) => ctx.dispatch(new DeleteHotelFail(error)))
        );
    }

    @Action(DeleteHotelSuccess)
    deleteHotelSuccess(ctx: StateContext<HotelStateModel>, {payload}: DeleteHotelSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Hotel excluído com sucesso!');
    }

    @Action(DeleteHotelFail)
    deleteHotelFail(ctx: StateContext<HotelStateModel>, {payload}: DeleteHotelFail) {
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
