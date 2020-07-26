import {ServiceModel} from '../../../shared/models/service.model';

export class OpenTransportModal {
    static readonly type = '[Units] Open Transport Modal';

    constructor(public payload: { editing: boolean, data?: ServiceModel }) {
    }
}

export class CloseTransportModal {
    static readonly type = '[Units] Close Transport Modal';
}

