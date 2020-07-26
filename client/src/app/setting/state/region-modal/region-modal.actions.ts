import {RegionModel} from '../../../shared/models/region.model';

export class OpenRegionModal {
    static readonly type = '[Regions] Open Region Modal';

    constructor(public payload: { editing: boolean, data?: RegionModel }) {
    }
}

export class CloseRegionModal {
    static readonly type = '[Regions] Close Region Modal';
}

