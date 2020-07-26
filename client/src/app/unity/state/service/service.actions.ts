import {ServiceModel} from '../../../shared/models/service.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class ExpectedTimeService {
    static readonly type = '[Services] Expected Time Service';

    constructor(public payload: { service: number, size: number }) {
    }
}

export class SelectService {
    static readonly type = '[Services] Select Service';

    constructor(public payload: ServiceModel) {
    }
}

export class LoadServices {
    static readonly type = '[Services] Load Services';
}

export class LoadServicesSuccess {
    static readonly type = '[Services] Load Services Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadServicesFail {
    static readonly type = '[Services] Load Services Fail';

    constructor(public payload: any) {
    }
}

export class LoadServicesUnity {
    static readonly type = '[Services] Load Services Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadServicesUnitySuccess {
    static readonly type = '[Services] Load Services Unity Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadServicesUnityFail {
    static readonly type = '[Services] Load Services Unity Fail';

    constructor(public payload: any) {
    }
}

export class CreateService {
    static readonly type = '[Services] Create Service';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateServiceSuccess {
    static readonly type = '[Services] Create Service Success';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateServiceFail {
    static readonly type = '[Services] Create Service Fail';

    constructor(public payload: any) {
    }
}

export class UpdateService {
    static readonly type = '[Services] Update Service';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateServiceSuccess {
    static readonly type = '[Services] Update Service Success';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateServiceFail {
    static readonly type = '[Services] Update Service Fail';

    constructor(public payload: any) {
    }
}

export class UpdateStatusService {
  static readonly type = '[Services] Update Status Service';

  constructor(public payload: number) {
  }
}

export class UpdateStatusServiceSuccess {
  static readonly type = '[Services] Update Status Service Success';
}

export class UpdateStatusServiceFail {
  static readonly type = '[Services] Update Status Service Fail';

  constructor(public payload: any) {
  }
}

export class DeleteService {
    static readonly type = '[Services] Delete Service';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteServiceSuccess {
    static readonly type = '[Services] Delete Service Success';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteServiceFail {
    static readonly type = '[Services] Delete Service Fail';

    constructor(public payload: any) {
    }
}
