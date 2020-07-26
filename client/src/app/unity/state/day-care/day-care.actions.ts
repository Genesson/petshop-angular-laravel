import {ServiceModel} from '../../../shared/models/service.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectDayCare {
    static readonly type = '[DayCares] Select DayCare';

    constructor(public payload: ServiceModel) {
    }
}

export class LoadDayCares {
    static readonly type = '[DayCares] Load DayCares';
}

export class LoadDayCaresSuccess {
    static readonly type = '[DayCares] Load DayCares Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadDayCaresFail {
    static readonly type = '[DayCares] Load DayCares Fail';

    constructor(public payload: any) {
    }
}

export class LoadDayCaresUnity {
    static readonly type = '[DayCares] Load DayCares Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadDayCaresUnitySuccess {
    static readonly type = '[DayCares] Load DayCares Unity Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadDayCaresUnityFail {
    static readonly type = '[DayCares] Load DayCares Unity Fail';

    constructor(public payload: any) {
    }
}

export class CreateDayCare {
    static readonly type = '[DayCares] Create DayCare';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateDayCareSuccess {
    static readonly type = '[DayCares] Create DayCare Success';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateDayCareFail {
    static readonly type = '[DayCares] Create DayCare Fail';

    constructor(public payload: any) {
    }
}

export class UpdateDayCare {
    static readonly type = '[DayCares] Update DayCare';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateDayCareSuccess {
    static readonly type = '[DayCares] Update DayCare Success';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateDayCareFail {
    static readonly type = '[DayCares] Update DayCare Fail';

    constructor(public payload: any) {
    }
}

export class DeleteDayCare {
    static readonly type = '[DayCares] Delete DayCare';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteDayCareSuccess {
    static readonly type = '[DayCares] Delete DayCare Success';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteDayCareFail {
    static readonly type = '[DayCares] Delete DayCare Fail';

    constructor(public payload: any) {
    }
}
