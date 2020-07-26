import {RoomModel} from '../../../shared/models/room.model';

export class SelectRoom {
    static readonly type = '[Rooms] Select Room Success';

    constructor(public payload: RoomModel) {
    }
}

export class LoadRooms {
    static readonly type = '[Rooms] Load Rooms';
}

export class LoadRoomsSuccess {
    static readonly type = '[Rooms] Load Rooms Success';

    constructor(public payload: RoomModel[]) {
    }
}

export class LoadRoomsFail {
    static readonly type = '[Rooms] Load Rooms Fail';

    constructor(public payload: string) {
    }
}

export class CreateRoom {
    static readonly type = '[Rooms] Create Room';

    constructor(public payload: RoomModel) {
    }
}

export class CreateRoomSuccess {
    static readonly type = '[Rooms] Create Room Success';

    constructor(public payload: RoomModel) {
    }
}

export class CreateRoomFail {
    static readonly type = '[Rooms] Create Room Fail';

    constructor(public payload: any) {
    }
}

export class UpdateRoom {
    static readonly type = '[Rooms] Update Room';

    constructor(public payload: RoomModel) {
    }
}

export class UpdateRoomSuccess {
    static readonly type = '[Rooms] Update Room Success';

    constructor(public payload: RoomModel) {
    }
}

export class UpdateRoomFail {
    static readonly type = '[Rooms] Update Room Fail';

    constructor(public payload: any) {
    }
}

export class DeleteRoom {
    static readonly type = '[Rooms] Delete Room';

    constructor(public payload: RoomModel) {
    }
}

export class DeleteRoomSuccess {
    static readonly type = '[Rooms] Delete Room Success';

    constructor(public payload: RoomModel) {
    }
}

export class DeleteRoomFail {
    static readonly type = '[Rooms] Delete Room Fail';

    constructor(public payload: any) {
    }
}
