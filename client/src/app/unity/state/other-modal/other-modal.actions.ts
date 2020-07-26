import {ServiceModel} from '../../../shared/models/service.model';

export class OpenOtherModal {
    static readonly type = '[Units] Open Other Modal';

    constructor(public payload: { editing: boolean, data?: ServiceModel }) {
    }
}

export class CloseOtherModal {
    static readonly type = '[Units] Close Other Modal';
}

