import {DistrictModel} from '../../../shared/models/district.model';

export class SelectDistrict {
    static readonly type = '[Districts] Select District Success';

    constructor(public payload: DistrictModel) {
    }
}

export class LoadDistricts {
    static readonly type = '[Districts] Load Districts';
}

export class LoadDistrictsSuccess {
    static readonly type = '[Districts] Load Districts Success';

    constructor(public payload: DistrictModel[]) {
    }
}

export class LoadDistrictsFail {
    static readonly type = '[Districts] Load Districts Fail';

    constructor(public payload: string) {
    }
}

export class CreateDistrict {
    static readonly type = '[Districts] Create District';

    constructor(public payload: DistrictModel) {
    }
}

export class CreateDistrictSuccess {
    static readonly type = '[Districts] Create District Success';

    constructor(public payload: DistrictModel) {
    }
}

export class CreateDistrictFail {
    static readonly type = '[Districts] Create District Fail';

    constructor(public payload: any) {
    }
}

export class UpdateDistrict {
    static readonly type = '[Districts] Update District';

    constructor(public payload: DistrictModel) {
    }
}

export class UpdateDistrictSuccess {
    static readonly type = '[Districts] Update District Success';

    constructor(public payload: DistrictModel) {
    }
}

export class UpdateDistrictFail {
    static readonly type = '[Districts] Update District Fail';

    constructor(public payload: any) {
    }
}

export class DeleteDistrict {
    static readonly type = '[Districts] Delete District';

    constructor(public payload: DistrictModel) {
    }
}

export class DeleteDistrictSuccess {
    static readonly type = '[Districts] Delete District Success';

    constructor(public payload: DistrictModel) {
    }
}

export class DeleteDistrictFail {
    static readonly type = '[Districts] Delete District Fail';

    constructor(public payload: any) {
    }
}
