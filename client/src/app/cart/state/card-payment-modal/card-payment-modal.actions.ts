import {OrderModel} from '../../../shared/models/order.model';

export class OpenCardPaymentModal {
    static readonly type = '[Receives] Open Card Payment Modal';

    constructor(public payload: OrderModel) {
    }
}

export class CloseCardPaymentModal {
    static readonly type = '[Receives] Close Card Payment Modal';
}

