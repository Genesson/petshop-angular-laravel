import {PayableModel} from '../../../shared/models/payable.model';

export class SelectPayable {
    static readonly type = '[Payables] Select Payable Success';

    constructor(public payload: PayableModel) {
    }
}

export class LoadPayables {
    static readonly type = '[Payables] Load Payables';
}

export class LoadPayablesSuccess {
    static readonly type = '[Payables] Load Payables Success';

    constructor(public payload: PayableModel[]) {
    }
}

export class LoadPayablesFail {
    static readonly type = '[Payables] Load Payables Fail';

    constructor(public payload: string) {
    }
}

export class CreatePayable {
    static readonly type = '[Payables] Create Payable';

    constructor(public payload: PayableModel) {
    }
}

export class CreatePayableSuccess {
    static readonly type = '[Payables] Create Payable Success';

    constructor(public payload: PayableModel) {
    }
}

export class CreatePayableFail {
    static readonly type = '[Payables] Create Payable Fail';

    constructor(public payload: any) {
    }
}

export class UpdatePayable {
    static readonly type = '[Payables] Update Payable';

    constructor(public payload: PayableModel) {
    }
}

export class UpdatePayableSuccess {
    static readonly type = '[Payables] Update Payable Success';

    constructor(public payload: PayableModel) {
    }
}

export class UpdatePayableFail {
    static readonly type = '[Payables] Update Payable Fail';

    constructor(public payload: any) {
    }
}

export class DeletePayable {
    static readonly type = '[Payables] Delete Payable';

    constructor(public payload: PayableModel) {
    }
}

export class DeletePayableSuccess {
    static readonly type = '[Payables] Delete Payable Success';

    constructor(public payload: PayableModel) {
    }
}

export class DeletePayableFail {
    static readonly type = '[Payables] Delete Payable Fail';

    constructor(public payload: any) {
    }
}
