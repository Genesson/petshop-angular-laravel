import {RoomModel} from '../../../shared/models/room.model';

export class OpenRoomModal {
    static readonly type = '[Rooms] Open Room Modal';

    constructor(public payload: { editing: boolean, data?: RoomModel }) {
    }
}

export class CloseRoomModal {
    static readonly type = '[Rooms] Close Room Modal';
}

