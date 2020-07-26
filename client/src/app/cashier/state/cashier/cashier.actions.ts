import {CashierModel} from '../../../shared/models/cashier.model';

export class SelectCashier {
    static readonly type = '[Cashiers] Select Cashier Success';

    constructor(public payload: CashierModel) {
    }
}

export class LoadCashiers {
    static readonly type = '[Cashiers] Load Cashiers';
}

export class LoadCashiersSuccess {
    static readonly type = '[Cashiers] Load Cashiers Success';

    constructor(public payload: CashierModel[]) {
    }
}

export class LoadCashiersFail {
    static readonly type = '[Cashiers] Load Cashiers Fail';

    constructor(public payload: any) {
    }
}

export class CreateCashier {
    static readonly type = '[Cashiers] Create Cashier';

    constructor(public payload: CashierModel) {
    }
}

export class CreateCashierSuccess {
    static readonly type = '[Cashiers] Create Cashier Success';

    constructor(public payload: CashierModel) {
    }
}

export class CreateCashierFail {
    static readonly type = '[Cashiers] Create Cashier Fail';

    constructor(public payload: any) {
    }
}
