import {ReceivableModel} from '../../../shared/models/receivable.model';

export class SelectReceivable {
    static readonly type = '[Receivables] Select Receivable Success';

    constructor(public payload: ReceivableModel) {
    }
}

export class LoadReceivables {
    static readonly type = '[Receivables] Load Receivables';

    constructor(public payload: string) {
    }
}

export class LoadReceivablesSuccess {
    static readonly type = '[Receivables] Load Receivables Success';

    constructor(public payload: ReceivableModel[]) {
    }
}

export class LoadReceivablesFail {
    static readonly type = '[Receivables] Load Receivables Fail';

    constructor(public payload: string) {
    }
}

export class LoadReceivablesTotals {
    static readonly type = '[Receivables] Load Receivables Totals';
}

export class LoadReceivablesTotalsSuccess {
    static readonly type = '[Receivables] Load Receivables Totals Success';

    constructor(public payload: { received: number, receivableToday: number, receivable: number }) {
    }
}

export class LoadReceivablesTotalsFail {
    static readonly type = '[Receivables] Load Receivables Totals Fail';

    constructor(public payload: string) {
    }
}

export class CreateReceivable {
    static readonly type = '[Receivables] Create Receivable';

    constructor(public payload: ReceivableModel) {
    }
}

export class CreateReceivableSuccess {
    static readonly type = '[Receivables] Create Receivable Success';

    constructor(public payload: ReceivableModel) {
    }
}

export class CreateReceivableFail {
    static readonly type = '[Receivables] Create Receivable Fail';

    constructor(public payload: any) {
    }
}

export class UpdateReceivable {
    static readonly type = '[Receivables] Update Receivable';

    constructor(public payload: ReceivableModel) {
    }
}

export class UpdateReceivableSuccess {
    static readonly type = '[Receivables] Update Receivable Success';

    constructor(public payload: ReceivableModel) {
    }
}

export class UpdateReceivableFail {
    static readonly type = '[Receivables] Update Receivable Fail';

    constructor(public payload: any) {
    }
}

export class DeleteReceivable {
    static readonly type = '[Receivables] Delete Receivable';

    constructor(public payload: ReceivableModel) {
    }
}

export class DeleteReceivableSuccess {
    static readonly type = '[Receivables] Delete Receivable Success';

    constructor(public payload: ReceivableModel) {
    }
}

export class DeleteReceivableFail {
    static readonly type = '[Receivables] Delete Receivable Fail';

    constructor(public payload: any) {
    }
}
