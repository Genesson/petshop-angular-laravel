import {ServiceModel} from '../../shared/models/service.model';
import {CategoryModel} from '../../shared/models/category.model';

export class UpdateSessionToken {
    static readonly type = '[Session] Update Session Token';

    constructor(public payload: { refreshToken: string, accessToken: string, IdToken: string }) {
    }
}

export class Logoff {
    static readonly type = '[Session] Logoff';
}

export class RefreshToken {
    static readonly type = '[Session] Refresh Token';
}

export class RefreshTokenSuccess {
    static readonly type = '[Session] Refresh Token Success';

    constructor(public payload: { refreshToken: string, accessToken: string, IdToken: string }) {
    }
}

export class RefreshTokenError {
    static readonly type = '[Session] Refresh Token Error';

    constructor(public payload: string) {
    }
}

export class SelectCategories {
    static readonly type = '[Session] Select Categories';

    constructor(public payload: CategoryModel[]) {
    }
}

export class SelectServiceShower {
    static readonly type = '[Session] Select Service Shower';

    constructor(public payload: ServiceModel[]) {
    }
}

export class SelectServiceOthers {
    static readonly type = '[Session] Select Service Others';

    constructor(public payload: ServiceModel[]) {
    }
}

export class SelectServiceHotel {
    static readonly type = '[Session] Select Service Hotel';

    constructor(public payload: ServiceModel) {
    }
}

export class SelectServiceSitter {
    static readonly type = '[Session] Select Service Sitter';

    constructor(public payload: ServiceModel) {
    }
}

export class SelectServiceDaycare {
    static readonly type = '[Session] Select Service Daycare';

    constructor(public payload: ServiceModel) {
    }
}
