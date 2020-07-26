import {Action, State, StateContext} from '@ngxs/store';

import {OpenRoomModal, CloseRoomModal} from './room-modal.actions';

import {RoomModalService} from '../../services/room-modal.service';

export interface RoomModalStateModel {
    isLoading: boolean;
}

@State<RoomModalStateModel>({
    name: 'roomModal',
    defaults: {
        isLoading: false
    }
})

export class RoomModalState {

    constructor(private roomModalService: RoomModalService) {
    }

    @Action(OpenRoomModal)
    async openTutorModal(ctx: StateContext<RoomModalStateModel>, {payload}: OpenRoomModal) {
        await this.roomModalService.open(payload.editing, (payload.data) ? payload.data : null);
    }

    @Action(CloseRoomModal)
    closeTutorModal(ctx: StateContext<RoomModalStateModel>) {
        this.roomModalService.close();
    }

}
