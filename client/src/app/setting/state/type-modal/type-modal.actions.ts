import {TypeModel} from '../../../shared/models/type.model';

export class OpenTypeModal {
    static readonly type = '[Types] Open Type Modal';

    constructor(public payload: { editing: boolean, data?: TypeModel }) {
    }
}

export class CloseTypeModal {
    static readonly type = '[Types] Close Type Modal';
}
