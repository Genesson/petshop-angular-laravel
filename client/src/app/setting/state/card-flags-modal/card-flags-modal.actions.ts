import {CardFlagModel} from '../../../shared/models/cardFlag.model';

export class OpenCardFlagModal {
    static readonly type = '[CardFlags] Open CardFlag Modal';

    constructor(public payload: { editing: boolean, data?: CardFlagModel }) {
    }
}

export class CloseCardFlagModal {
    static readonly type = '[CardFlags] Close CardFlag Modal';
}

