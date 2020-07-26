import {ServiceModel} from '../../../shared/models/service.model';

export class OpenShowerModal {
    static readonly type = '[Units] Open Shower Modal';

    constructor(public payload: { editing: boolean, data?: ServiceModel }) {
    }
}

export class CloseShowerModal {
    static readonly type = '[Units] Close Shower Modal';
}

