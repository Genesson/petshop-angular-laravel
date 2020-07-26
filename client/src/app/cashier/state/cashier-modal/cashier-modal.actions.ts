import {CashierModel} from '../../../shared/models/cashier.model';

export class OpenCashierModal {
    static readonly type = '[Cashiers] Open Cashier Modal';

    constructor(public payload: { action: string, operation: string, data: CashierModel }) {
    }
}

export class CloseCashierModal {
    static readonly type = '[Cashiers] Close Cashier Modal';
}

