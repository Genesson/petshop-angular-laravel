import {ServiceModel} from '../../../shared/models/service.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectShower {
    static readonly type = '[Showers] Select Shower';

    constructor(public payload: ServiceModel) {
    }
}

export class LoadShowers {
    static readonly type = '[Showers] Load Showers';
}

export class LoadShowersSuccess {
    static readonly type = '[Showers] Load Showers Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadShowersFail {
    static readonly type = '[Showers] Load Showers Fail';

    constructor(public payload: any) {
    }
}

export class LoadShowersUnity {
    static readonly type = '[Showers] Load Showers Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadShowersUnitySuccess {
    static readonly type = '[Showers] Load Showers Unity Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadShowersUnityFail {
    static readonly type = '[Showers] Load Showers Unity Fail';

    constructor(public payload: any) {
    }
}

export class CreateShower {
    static readonly type = '[Showers] Create Shower';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateShowerSuccess {
    static readonly type = '[Showers] Create Shower Success';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateShowerFail {
    static readonly type = '[Showers] Create Shower Fail';

    constructor(public payload: any) {
    }
}

export class UpdateShower {
    static readonly type = '[Showers] Update Shower';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateShowerSuccess {
    static readonly type = '[Showers] Update Shower Success';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateShowerFail {
    static readonly type = '[Showers] Update Shower Fail';

    constructor(public payload: any) {
    }
}

export class DeleteShower {
    static readonly type = '[Showers] Delete Shower';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteShowerSuccess {
    static readonly type = '[Showers] Delete Shower Success';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteShowerFail {
    static readonly type = '[Showers] Delete Shower Fail';

    constructor(public payload: any) {
    }
}
