import {ServiceModel} from '../../../shared/models/service.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectHotel {
    static readonly type = '[Hotels] Select Hotel';

    constructor(public payload: ServiceModel) {
    }
}

export class LoadHotels {
    static readonly type = '[Hotels] Load Hotels';
}

export class LoadHotelsSuccess {
    static readonly type = '[Hotels] Load Hotels Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadHotelsFail {
    static readonly type = '[Hotels] Load Hotels Fail';

    constructor(public payload: any) {
    }
}

export class LoadHotelsUnity {
    static readonly type = '[Hotels] Load Hotels Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadHotelsUnitySuccess {
    static readonly type = '[Hotels] Load Hotels Unity Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadHotelsUnityFail {
    static readonly type = '[Hotels] Load Hotels Unity Fail';

    constructor(public payload: any) {
    }
}

export class CreateHotel {
    static readonly type = '[Hotels] Create Hotel';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateHotelSuccess {
    static readonly type = '[Hotels] Create Hotel Success';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateHotelFail {
    static readonly type = '[Hotels] Create Hotel Fail';

    constructor(public payload: any) {
    }
}

export class UpdateHotel {
    static readonly type = '[Hotels] Update Hotel';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateHotelSuccess {
    static readonly type = '[Hotels] Update Hotel Success';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateHotelFail {
    static readonly type = '[Hotels] Update Hotel Fail';

    constructor(public payload: any) {
    }
}

export class DeleteHotel {
    static readonly type = '[Hotels] Delete Hotel';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteHotelSuccess {
    static readonly type = '[Hotels] Delete Hotel Success';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteHotelFail {
    static readonly type = '[Hotels] Delete Hotel Fail';

    constructor(public payload: any) {
    }
}
