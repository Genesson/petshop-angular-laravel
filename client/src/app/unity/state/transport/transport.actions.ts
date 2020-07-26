import {ServiceModel} from '../../../shared/models/service.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectTransport {
    static readonly type = '[Transports] Select Transport';

    constructor(public payload: ServiceModel) {
    }
}

export class LoadTransports {
    static readonly type = '[Transports] Load Transports';
}

export class LoadTransportsSuccess {
    static readonly type = '[Transports] Load Transports Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadTransportsFail {
    static readonly type = '[Transports] Load Transports Fail';

    constructor(public payload: any) {
    }
}

export class LoadTransportsUnity {
    static readonly type = '[Transports] Load Transports Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadTransportsUnitySuccess {
    static readonly type = '[Transports] Load Transports Unity Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadTransportsUnityFail {
    static readonly type = '[Transports] Load Transports Unity Fail';

    constructor(public payload: any) {
    }
}

export class CreateTransport {
    static readonly type = '[Transports] Create Transport';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateTransportSuccess {
    static readonly type = '[Transports] Create Transport Success';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateTransportFail {
    static readonly type = '[Transports] Create Transport Fail';

    constructor(public payload: any) {
    }
}

export class UpdateTransport {
    static readonly type = '[Transports] Update Transport';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateTransportSuccess {
    static readonly type = '[Transports] Update Transport Success';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateTransportFail {
    static readonly type = '[Transports] Update Transport Fail';

    constructor(public payload: any) {
    }
}

export class DeleteTransport {
    static readonly type = '[Transports] Delete Transport';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteTransportSuccess {
    static readonly type = '[Transports] Delete Transport Success';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteTransportFail {
    static readonly type = '[Transports] Delete Transport Fail';

    constructor(public payload: any) {
    }
}
