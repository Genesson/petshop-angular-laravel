import {ServiceModel} from '../../../shared/models/service.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectOther {
    static readonly type = '[Others] Select Other';

    constructor(public payload: ServiceModel) {
    }
}

export class LoadOthers {
    static readonly type = '[Others] Load Others';
}

export class LoadOthersSuccess {
    static readonly type = '[Others] Load Others Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadOthersFail {
    static readonly type = '[Others] Load Others Fail';

    constructor(public payload: any) {
    }
}

export class LoadOthersUnity {
    static readonly type = '[Others] Load Others Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadOthersUnitySuccess {
    static readonly type = '[Others] Load Others Unity Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadOthersUnityFail {
    static readonly type = '[Others] Load Others Unity Fail';

    constructor(public payload: any) {
    }
}

export class CreateOther {
    static readonly type = '[Others] Create Other';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateOtherSuccess {
    static readonly type = '[Others] Create Other Success';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateOtherFail {
    static readonly type = '[Others] Create Other Fail';

    constructor(public payload: any) {
    }
}

export class UpdateOther {
    static readonly type = '[Others] Update Other';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateOtherSuccess {
    static readonly type = '[Others] Update Other Success';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateOtherFail {
    static readonly type = '[Others] Update Other Fail';

    constructor(public payload: any) {
    }
}

export class DeleteOther {
    static readonly type = '[Others] Delete Other';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteOtherSuccess {
    static readonly type = '[Others] Delete Other Success';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteOtherFail {
    static readonly type = '[Others] Delete Other Fail';

    constructor(public payload: any) {
    }
}
