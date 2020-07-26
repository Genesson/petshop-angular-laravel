import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';

import {OrderSelectors} from './state/order/order.selectors';

import {OrderModel} from '../shared/models/order.model';
import {ProductModel} from '../shared/models/product.model';
import {ServiceModel} from '../shared/models/service.model';
import {PetModel} from '../shared/models/pet.model';

import {
    LoadOrder,
    AddItem,
    UpdateDiscount,
    UpdateItem,
    RemoveItem, CreateReceivables
} from './state/order/order.actions';
import {
    OpenCardPaymentModal,
    CloseCardPaymentModal
} from './state/card-payment-modal/card-payment-modal.actions';

import {SessionSandbox} from '../session/session.sandbox';

@Injectable({
    providedIn: 'root'
})
export class CartSandbox {

    @Select(OrderSelectors.selected) orderSelected$: Observable<OrderModel>;

    @Select(OrderSelectors.isLoading) isLoading$: Observable<boolean>;

    constructor(private store: Store,
                private sessionSandbox: SessionSandbox) {
    }

    public addItem(item: ProductModel | ServiceModel, pet: PetModel) {
        this.store.dispatch(new AddItem({quantity: 1, item, pet}));
    }

    public updateDiscount(amount) {
        this.store.dispatch(new UpdateDiscount(amount));
    }

    public updateQuantityItem(item) {
        this.store.dispatch(new UpdateItem(item));
    }

    public removeItem(item: ProductModel | ServiceModel) {
        this.store.dispatch(new RemoveItem(item));
    }

    public createReceivables(receivable: any) {
        this.store.dispatch(new CreateReceivables(receivable));
    }

    public loadOrder() {
        this.store.dispatch(new LoadOrder(this.sessionSandbox.userData));
    }

    public openCardPaymentModal(order: OrderModel) {
        this.store.dispatch(new OpenCardPaymentModal(order));
    }

    public closeCardPaymentModal() {
        this.store.dispatch(new CloseCardPaymentModal());
    }

}
