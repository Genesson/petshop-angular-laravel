import {TypeFurModel} from '../../../shared/models/type-fur.model';

export class OpenTypeFurModal {
    static readonly type = '[TypeFurs] Open TypeFur Modal';

    constructor(public payload: { editing: boolean, data?: TypeFurModel }) {
    }
}

export class CloseTypeFurModal {
    static readonly type = '[TypeFurs] Close TypeFur Modal';
}

