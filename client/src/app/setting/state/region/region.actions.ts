import {RegionModel} from '../../../shared/models/region.model';

export class SelectRegion {
    static readonly type = '[Regions] Select Region Success';

    constructor(public payload: RegionModel) {
    }
}

export class LoadRegions {
    static readonly type = '[Regions] Load Regions';
}

export class LoadRegionsSuccess {
    static readonly type = '[Regions] Load Regions Success';

    constructor(public payload: RegionModel[]) {
    }
}

export class LoadRegionsFail {
    static readonly type = '[Regions] Load Regions Fail';

    constructor(public payload: string) {
    }
}

export class CreateRegion {
    static readonly type = '[Regions] Create Region';

    constructor(public payload: RegionModel) {
    }
}

export class CreateRegionSuccess {
    static readonly type = '[Regions] Create Region Success';

    constructor(public payload: RegionModel[]) {
    }
}

export class CreateRegionFail {
    static readonly type = '[Regions] Create Region Fail';

    constructor(public payload: any) {
    }
}

export class UpdateRegion {
    static readonly type = '[Regions] Update Region';

    constructor(public payload: RegionModel) {
    }
}

export class UpdateRegionSuccess {
    static readonly type = '[Regions] Update Region Success';

    constructor(public payload: RegionModel[]) {
    }
}

export class UpdateRegionFail {
    static readonly type = '[Regions] Update Region Fail';

    constructor(public payload: any) {
    }
}

export class DeleteRegion {
    static readonly type = '[Regions] Delete Region';

    constructor(public payload: RegionModel) {
    }
}

export class DeleteRegionSuccess {
    static readonly type = '[Regions] Delete Region Success';

    constructor(public payload: RegionModel) {
    }
}

export class DeleteRegionFail {
    static readonly type = '[Regions] Delete Region Fail';

    constructor(public payload: any) {
    }
}
