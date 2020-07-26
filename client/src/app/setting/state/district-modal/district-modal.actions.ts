import {DistrictModel} from '../../../shared/models/district.model';

export class OpenDistrictModal {
    static readonly type = '[Districts] Open District Modal';

    constructor(public payload: { editing: boolean, data?: DistrictModel }) {
    }
}

export class CloseDistrictModal {
    static readonly type = '[Districts] Close District Modal';
}

