import {ProvinceModel} from '../../../models/province.model';

export class LoadProvinces {
    static readonly type = '[Provinces] Load Provinces';
}

export class LoadProvincesSuccess {
    static readonly type = '[Provinces] Load Provinces Success';

    constructor(public payload: ProvinceModel[]) {
    }
}

export class LoadProvincesFail {
    static readonly type = '[Provinces] Load Provinces Fail';

    constructor(public payload: string) {
    }
}
