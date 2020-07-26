import {ServiceModel} from '../../../shared/models/service.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectSubService {
    static readonly type = '[SubServices] Select SubService';

    constructor(public payload: ServiceModel) {
    }
}

export class LoadSubServices {
    static readonly type = '[SubServices] Load SubServices';

    constructor(public payload: UnityModel) {
    }
}

export class LoadSubServicesSuccess {
    static readonly type = '[SubServices] Load SubServices Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadSubServicesFail {
    static readonly type = '[SubServices] Load SubServices Fail';

    constructor(public payload: any) {
    }
}

export class CreateSubService {
    static readonly type = '[Services] Create SubService';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateSubServiceSuccess {
    static readonly type = '[Services] Create SubService Success';

    constructor(public payload: ServiceModel) {
    }
}

export class CreateSubServiceFail {
    static readonly type = '[Services] Create SubService Fail';

    constructor(public payload: any) {
    }
}

export class UpdateSubService {
    static readonly type = '[Services] Update SubService';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateSubServiceSuccess {
    static readonly type = '[Services] Update SubService Success';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdateSubServiceFail {
    static readonly type = '[Services] Update SubService Fail';

    constructor(public payload: any) {
    }
}

export class DeleteSubService {
    static readonly type = '[Services] Delete SubService';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteSubServiceSuccess {
    static readonly type = '[Services] Delete SubService Success';

    constructor(public payload: ServiceModel) {
    }
}

export class DeleteSubServiceFail {
    static readonly type = '[Services] Delete SubService Fail';

    constructor(public payload: any) {
    }
}
