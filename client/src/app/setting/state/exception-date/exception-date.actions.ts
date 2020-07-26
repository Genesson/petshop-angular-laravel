import {ExceptionDateModel} from '../../../shared/models/exception-date.model';

export class SelectExceptionDate {
    static readonly type = '[ExceptionDates] Select ExceptionDate Success';

    constructor(public payload: ExceptionDateModel) {
    }
}

export class LoadExceptionDates {
    static readonly type = '[ExceptionDates] Load ExceptionDates';
}

export class LoadExceptionDatesSuccess {
    static readonly type = '[ExceptionDates] Load ExceptionDates Success';

    constructor(public payload: ExceptionDateModel[]) {
    }
}

export class LoadExceptionDatesFail {
    static readonly type = '[ExceptionDates] Load ExceptionDates Fail';

    constructor(public payload: string) {
    }
}

export class CreateExceptionDate {
    static readonly type = '[ExceptionDates] Create ExceptionDate';

    constructor(public payload: ExceptionDateModel) {
    }
}

export class CreateExceptionDateSuccess {
    static readonly type = '[ExceptionDates] Create ExceptionDate Success';

    constructor(public payload: ExceptionDateModel) {
    }
}

export class CreateExceptionDateFail {
    static readonly type = '[ExceptionDates] Create ExceptionDate Fail';

    constructor(public payload: any) {
    }
}

export class UpdateExceptionDate {
    static readonly type = '[ExceptionDates] Update ExceptionDate';

    constructor(public payload: ExceptionDateModel) {
    }
}

export class UpdateExceptionDateSuccess {
    static readonly type = '[ExceptionDates] Update ExceptionDate Success';

    constructor(public payload: ExceptionDateModel) {
    }
}

export class UpdateExceptionDateFail {
    static readonly type = '[ExceptionDates] Update ExceptionDate Fail';

    constructor(public payload: any) {
    }
}

export class DeleteExceptionDate {
    static readonly type = '[ExceptionDates] Delete ExceptionDate';

    constructor(public payload: ExceptionDateModel) {
    }
}

export class DeleteExceptionDateSuccess {
    static readonly type = '[ExceptionDates] Delete ExceptionDate Success';

    constructor(public payload: ExceptionDateModel) {
    }
}

export class DeleteExceptionDateFail {
    static readonly type = '[ExceptionDates] Delete ExceptionDate Fail';

    constructor(public payload: any) {
    }
}
