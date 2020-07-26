import {ServiceModel} from '../../../shared/models/service.model';

export class OpenServiceModal {
    static readonly type = '[Units] Open Service Modal';

    constructor(public payload: { editing: boolean, data?: ServiceModel }) {
    }
}

export class CloseServiceModal {
    static readonly type = '[Units] Close Service Modal';
}

