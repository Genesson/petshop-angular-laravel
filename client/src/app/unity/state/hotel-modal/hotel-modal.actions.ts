import {ServiceModel} from '../../../shared/models/service.model';

export class OpenHotelModal {
    static readonly type = '[Units] Open Hotel Modal';

    constructor(public payload: { editing: boolean, data?: ServiceModel }) {
    }
}

export class CloseHotelModal {
    static readonly type = '[Units] Close Hotel Modal';
}

