import {ServiceModel} from '../../../shared/models/service.model';

export class OpenSubShowerModal {
    static readonly type = '[Units] Open SubShower Modal';

    constructor(public payload: { editing: boolean, data?: ServiceModel }) {
    }
}

export class CloseSubShowerModal {
    static readonly type = '[Units] Close SubShower Modal';
}

