import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectRoom,
    LoadRooms,
    LoadRoomsFail,
    LoadRoomsSuccess,
    CreateRoom,
    CreateRoomFail,
    CreateRoomSuccess,
    UpdateRoom,
    UpdateRoomFail,
    UpdateRoomSuccess,
    DeleteRoom,
    DeleteRoomFail,
    DeleteRoomSuccess
} from './room.actions';
import {CloseRoomModal} from '../room-modal/room-modal.actions';

import {RoomModel} from '../../../shared/models/room.model';

import {RoomResource} from '../../../shared/resources/room.resource';

export class RoomStateModel extends NgxsEntityStateStateModel<RoomModel> {
    isLoading: boolean;
}

@State<RoomStateModel>({
    name: 'room',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class RoomState {

    @Selector()
    static selected(state: RoomStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: RoomStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: RoomStateModel) {
        return state.entities;
    }

    constructor(private roomResource: RoomResource,
                private toastController: ToastController) {
    }

    @Action(SelectRoom)
    selectRoom(ctx: StateContext<RoomStateModel>, {payload}: SelectRoom) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadRooms)
    loadRooms(ctx: StateContext<RoomStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.roomResource.find().pipe(
            map((Unity: RoomModel[]) => ctx.dispatch(new LoadRoomsSuccess(Unity))),
            catchError((error) => ctx.dispatch(new LoadRoomsFail(error)))
        );
    }

    @Action(LoadRoomsSuccess)
    loadRoomsSuccess(ctx: StateContext<RoomStateModel>, {payload}: LoadRoomsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadRoomsFail)
    loadRoomsFail(ctx: StateContext<RoomStateModel>, {payload}: LoadRoomsFail) {
        console.warn(`Occorreu um erro ao carregar os comportamentos ${payload}`);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateRoom)
    createRoom(ctx: StateContext<RoomStateModel>, action: CreateRoom) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.roomResource.create(action.payload).pipe(
            map((Room: RoomModel) => ctx.dispatch(new CreateRoomSuccess(Room))),
            catchError((error) => ctx.dispatch(new CreateRoomFail(error)))
        );
    }

    @Action(CreateRoomSuccess)
    createRoomSuccess(ctx: StateContext<RoomStateModel>, {payload}: CreateRoomSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Quarto cadastrado com sucesso!');
        ctx.dispatch(new SelectRoom(payload));
        ctx.dispatch(new CloseRoomModal());
    }

    @Action(CreateRoomFail)
    createRoomFail(ctx: StateContext<RoomStateModel>, {payload}: CreateRoomFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateRoom)
    updateRoom(ctx: StateContext<RoomStateModel>, action: UpdateRoom) {
        ctx.patchState({isLoading: true});
        return this.roomResource.update(action.payload).pipe(
            map((Room: RoomModel) => ctx.dispatch(new UpdateRoomSuccess(Room))),
            catchError((error) => ctx.dispatch(new UpdateRoomFail(error)))
        );
    }

    @Action(UpdateRoomSuccess)
    updateRoomSuccess(ctx: StateContext<RoomStateModel>, {payload}: UpdateRoomSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Quarto atualizado com sucesso!');
        ctx.dispatch(new CloseRoomModal());
    }

    @Action(UpdateRoomFail)
    updateRoomFail(ctx: StateContext<RoomStateModel>, {payload}: UpdateRoomFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeleteRoom)
    deleteRoom(ctx: StateContext<RoomStateModel>, action: DeleteRoom) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.roomResource.destroy(action.payload).pipe(
            map((Room: RoomModel) => ctx.dispatch(new DeleteRoomSuccess(Room))),
            catchError((error) => ctx.dispatch(new DeleteRoomFail(error)))
        );
    }

    @Action(DeleteRoomSuccess)
    deleteRoomSuccess(ctx: StateContext<RoomStateModel>, {payload}: DeleteRoomSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Quarto excluído com sucesso!');
    }

    @Action(DeleteRoomFail)
    deleteRoomFail(ctx: StateContext<RoomStateModel>, {payload}: DeleteRoomFail) {
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
