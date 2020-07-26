import {CheckModel} from '../../../shared/models/check.model';

export class SelectCheck {
    static readonly type = '[Checks] Select Check Success';

    constructor(public payload: CheckModel) {
    }
}

export class LoadChecks {
    static readonly type = '[Checks] Load Checks';
}

export class LoadChecksSuccess {
    static readonly type = '[Checks] Load Checks Success';

    constructor(public payload: CheckModel[]) {
    }
}

export class LoadChecksFail {
    static readonly type = '[Checks] Load Checks Fail';

    constructor(public payload: any) {
    }
}

export class CreateCheck {
    static readonly type = '[Checks] Create Check';

    constructor(public payload: CheckModel) {
    }
}

export class CreateCheckSuccess {
    static readonly type = '[Checks] Create Check Success';

    constructor(public payload: CheckModel) {
    }
}

export class CreateCheckFail {
    static readonly type = '[Checks] Create Check Fail';

    constructor(public payload: any) {
    }
}

export class UpdateCheck {
    static readonly type = '[Checks] Update Check';

    constructor(public payload: CheckModel) {
    }
}

export class UpdateCheckSuccess {
    static readonly type = '[Checks] Update Check Success';

    constructor(public payload: CheckModel) {
    }
}

export class UpdateCheckFail {
    static readonly type = '[Checks] Update Check Fail';

    constructor(public payload: any) {
    }
}

export class DeleteCheck {
    static readonly type = '[Checks] Delete Check';

    constructor(public payload: CheckModel) {
    }
}

export class DeleteCheckSuccess {
    static readonly type = '[Checks] Delete Check Success';

    constructor(public payload: CheckModel) {
    }
}

export class DeleteCheckFail {
    static readonly type = '[Checks] Delete Check Fail';

    constructor(public payload: any) {
    }
}
