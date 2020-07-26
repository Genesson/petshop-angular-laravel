import {CheckModel} from '../../../shared/models/check.model';

export class OpenCheckModal {
    static readonly type = '[Checks] Open Check Modal';

    constructor(public payload: { editing: boolean, data?: CheckModel }) {
    }
}

export class CloseCheckModal {
    static readonly type = '[Checks] Close Check Modal';
}

