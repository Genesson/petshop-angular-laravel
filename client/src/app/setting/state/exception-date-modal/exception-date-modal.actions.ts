import {ExceptionDateModel} from '../../../shared/models/exception-date.model';

export class OpenExceptionDateModal {
    static readonly type = '[ExceptionDates] Open ExceptionDate Modal';

    constructor(public payload: { editing: boolean, data?: ExceptionDateModel }) {
    }
}

export class CloseExceptionDateModal {
    static readonly type = '[ExceptionDates] Close ExceptionDate Modal';
}

