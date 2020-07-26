import {ServiceModel} from '../../../shared/models/service.model';

export class OpenDayCareModal {
    static readonly type = '[Units] Open DayCare Modal';

    constructor(public payload: { editing: boolean, data?: ServiceModel }) {
    }
}

export class CloseDayCareModal {
    static readonly type = '[Units] Close DayCare Modal';
}

