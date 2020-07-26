export class OpenDreModal {
    static readonly type = '[Dres] Open Dre Modal';

    constructor(public payload: { editing: boolean, data?: any }) {
    }
}

export class CloseDreModal {
    static readonly type = '[Dres] Close Dre Modal';
}

