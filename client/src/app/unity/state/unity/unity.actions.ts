import {UnityModel} from '../../../shared/models/unity.model';

export class SelectUnity {
    static readonly type = '[Units] Select Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadUnits {
    static readonly type = '[Units] Load Units';
}

export class LoadUnitsSuccess {
    static readonly type = '[Units] Load Units Success';

    constructor(public payload: UnityModel[]) {
    }
}

export class LoadUnitsFail {
    static readonly type = '[Units] Load Units Fail';

    constructor(public payload: any) {
    }
}

export class CreateUnity {
    static readonly type = '[Units] Create Unity';

    constructor(public payload: UnityModel) {
    }
}

export class CreateUnitySuccess {
    static readonly type = '[Units] Create Unity Success';

    constructor(public payload: UnityModel) {
    }
}

export class CreateUnityFail {
    static readonly type = '[Units] Create Unity Fail';

    constructor(public payload: any) {
    }
}

export class UpdateUnity {
    static readonly type = '[Units] Update Unity';

    constructor(public payload: UnityModel) {
    }
}

export class UpdateUnitySuccess {
    static readonly type = '[Units] Update Unity Success';

    constructor(public payload: UnityModel) {
    }
}

export class UpdateUnityFail {
    static readonly type = '[Units] Update Unity Fail';

    constructor(public payload: any) {
    }
}

export class DeleteUnity {
    static readonly type = '[Units] Delete Unity';

    constructor(public payload: UnityModel) {
    }
}

export class DeleteUnitySuccess {
    static readonly type = '[Units] Delete Unity Success';

    constructor(public payload: UnityModel) {
    }
}

export class DeleteUnityFail {
    static readonly type = '[Units] Delete Unity Fail';

    constructor(public payload: any) {
    }
}

export class DisableUnity {
    static readonly type = '[Units] Disable Unity';

    constructor(public payload: UnityModel) {
    }
}

export class DisableUnitySuccess {
    static readonly type = '[Units] Disable Unity Success';

    constructor(public payload: UnityModel) {
    }
}

export class DisableUnityFail {
    static readonly type = '[Units] Disable Unity Fail';

    constructor(public payload: any) {
    }
}

export class UploadImageUnity {
    static readonly type = '[Units] Upload Image Unity';

    constructor(public payload: FormData) {
    }
}

export class UploadImageUnitySuccess {
    static readonly type = '[Units] Upload Image Unity Success';

    constructor(public payload: string) {
    }
}

export class UploadImageUnityFail {
    static readonly type = '[Units] Upload Image Unity Fail';

    constructor(public payload: any) {
    }
}
