import {ServiceModel} from '../../../shared/models/service.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectSubShower {
    static readonly type = '[SubShowers] Select SubShower';

    constructor(public payload: ServiceModel) {
    }
}

export class LoadSubShowers {
    static readonly type = '[SubShowers] Load SubShowers';
}

export class LoadSubShowersSuccess {
    static readonly type = '[SubShowers] Load SubShowers Success';

    constructor(public payload: any[]) {
    }
}

export class LoadSubShowersFail {
    static readonly type = '[SubShowers] Load SubShowers Fail';

    constructor(public payload: any) {
    }
}

export class LoadSubShowersUnity {
    static readonly type = '[SubShowers] Load SubShowers Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadSubShowersUnitySuccess {
    static readonly type = '[SubShowers] Load SubShowers Unity Success';

    constructor(public payload: any[]) {
    }
}

export class LoadSubShowersUnityFail {
    static readonly type = '[SubShowers] Load SubShowers Unity Fail';

    constructor(public payload: any) {
    }
}

export class CreateSubShower {
    static readonly type = '[SubShowers] Create SubShower';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateSubShowerSuccess {
    static readonly type = '[SubShowers] Create SubShower Success';

    constructor(public payload: any[]) {
    }
}

export class CreateSubShowerFail {
    static readonly type = '[SubShowers] Create SubShower Fail';

    constructor(public payload: any) {
    }
}

export class UpdateSubShower {
    static readonly type = '[SubShowers] Update SubShower';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateSubShowerSuccess {
    static readonly type = '[SubShowers] Update SubShower Success';

    constructor(public payload: any[]) {
    }
}

export class UpdateSubShowerFail {
    static readonly type = '[SubShowers] Update SubShower Fail';

    constructor(public payload: any) {
    }
}

export class DeleteSubShower {
    static readonly type = '[SubShowers] Delete SubShower';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteSubShowerSuccess {
    static readonly type = '[SubShowers] Delete SubShower Success';

    constructor(public payload: any[]) {
    }
}

export class DeleteSubShowerFail {
    static readonly type = '[SubShowers] Delete SubShower Fail';

    constructor(public payload: any) {
    }
}
