import {OrderModel} from '../../../shared/models/order.model';
import {ProductModel} from '../../../shared/models/product.model';
import {UserModel} from '../../../shared/models/user.model';
import {ServiceModel} from '../../../shared/models/service.model';
import {PetModel} from '../../../shared/models/pet.model';

export class SelectOrder {
    static readonly type = '[Orders] Select Order';

    constructor(public payload: OrderModel) {
    }
}

export class LoadOrder {
    static readonly type = '[Orders] Load Order';

    constructor(public payload: UserModel) {
    }
}

export class LoadOrderSuccess {
    static readonly type = '[Orders] Load Order Success';

    constructor(public payload: OrderModel) {
    }
}

export class LoadOrderFail {
    static readonly type = '[Orders] Load Order Fail';

    constructor(public payload: any) {
    }
}

export class LoadOrders {
    static readonly type = '[Orders] Load Orders';
}

export class LoadOrdersSuccess {
    static readonly type = '[Orders] Load Orders Success';

    constructor(public payload: OrderModel[]) {
    }
}

export class LoadOrdersFail {
    static readonly type = '[Orders] Load Orders Fail';

    constructor(public payload: any) {
    }
}

export class AddItem {
    static readonly type = '[Orders] Add Item';

    constructor(public payload: {quantity: number, item: ProductModel | ServiceModel, pet: PetModel, schedule?: number}) {
    }
}

export class AddItemSuccess {
    static readonly type = '[Orders] Add Item Success';

    constructor(public payload: OrderModel) {
    }
}

export class AddItemFail {
    static readonly type = '[Orders] Add Item Fail';

    constructor(public payload: any) {
    }
}

export class UpdateDiscount {
    static readonly type = '[Orders] Update Discount';

    constructor(public payload: number) {
    }
}

export class UpdateDiscountSuccess {
    static readonly type = '[Orders] Update Discount Success';

    constructor(public payload: OrderModel) {
    }
}

export class UpdateDiscountFail {
    static readonly type = '[Orders] Update Discount Fail';

    constructor(public payload: any) {
    }
}

export class UpdateItem {
    static readonly type = '[Orders] Update Item';

    constructor(public payload: { item: ProductModel | ServiceModel, quantity: number }) {
    }
}

export class UpdateItemSuccess {
    static readonly type = '[Orders] Update Item Success';

    constructor(public payload: OrderModel) {
    }
}

export class UpdateItemFail {
    static readonly type = '[Orders] Update Item Fail';

    constructor(public payload: any) {
    }
}

export class RemoveItem {
    static readonly type = '[Orders] Remove Item';

    constructor(public payload: ProductModel | ServiceModel) {
    }
}

export class RemoveItemSuccess {
    static readonly type = '[Orders] Remove Item Success';

    constructor(public payload: OrderModel) {
    }
}

export class RemoveItemFail {
    static readonly type = '[Orders] Remove Item Fail';

    constructor(public payload: any) {
    }
}

export class CreateReceivables {
    static readonly type = '[Orders] Create Receivables';

    constructor(public payload: any) {
    }
}

export class CreateReceivablesSuccess {
    static readonly type = '[Orders] Create Receivables Success';

    constructor(public payload: any) {
    }
}

export class CreateReceivablesFail {
    static readonly type = '[Orders] Create Receivables Fail';

    constructor(public payload: any) {
    }
}
