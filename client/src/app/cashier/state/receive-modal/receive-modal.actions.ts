import {ReceivableModel} from '../../../shared/models/receivable.model';

export class OpenReceiveModal {
    static readonly type = '[Receives] Open Receive Modal';

    constructor(public payload: ReceivableModel) {
    }
}

export class CloseReceiveModal {
    static readonly type = '[Receives] Close Receive Modal';
}

export class OpenReceiveViewModal {
    static readonly type = '[Receives] Open Receive View Modal';

    constructor(public payload: ReceivableModel) {
    }
}

export class CloseReceiveViewModal {
    static readonly type = '[Receives] Close Receive View Modal';
}

