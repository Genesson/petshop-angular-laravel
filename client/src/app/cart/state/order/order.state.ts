import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext, Store} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectOrder,
    LoadOrders,
    LoadOrdersSuccess,
    LoadOrdersFail,
    LoadOrder,
    LoadOrderSuccess,
    LoadOrderFail,
    AddItem,
    AddItemSuccess,
    AddItemFail,
    UpdateDiscount,
    UpdateDiscountSuccess,
    UpdateDiscountFail,
    UpdateItem,
    UpdateItemSuccess,
    UpdateItemFail,
    RemoveItem,
    RemoveItemSuccess,
    RemoveItemFail,
    CreateReceivables,
    CreateReceivablesSuccess,
    CreateReceivablesFail
} from './order.actions';
import {CloseCardPaymentModal} from '../card-payment-modal/card-payment-modal.actions';

import {OrderModel} from '../../../shared/models/order.model';

import {OrderResource} from '../../../shared/resources/order.resource';
import {Navigate} from '@ngxs/router-plugin';

export class OrderStateModel extends NgxsEntityStateStateModel<OrderModel> {
    isLoading: boolean;
}

@State<OrderStateModel>({
    name: 'order',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    },
})
@Injectable()
export class OrderState {

    @Selector()
    static selected(state: OrderStateModel) {
        return state.selected;
    }

    @Selector()
    static isLoading(state: OrderStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: OrderStateModel) {
        return state.entities;
    }

    constructor(private orderResource: OrderResource,
                private toastController: ToastController,
                private store: Store) {
    }

    @Action(SelectOrder)
    selectPaciente(ctx: StateContext<OrderStateModel>, {payload}: SelectOrder) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadOrder)
    loadOrdersUnity(ctx: StateContext<OrderStateModel>, {payload}: LoadOrder) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.orderResource.findOne(payload.id).pipe(
            map((Order: OrderModel) => ctx.dispatch(new LoadOrderSuccess(Order))),
            catchError((error) => ctx.dispatch(new LoadOrderFail(error)))
        );
    }

    @Action(LoadOrderSuccess)
    loadOrdersUnitySuccess(ctx: StateContext<OrderStateModel>, {payload}: LoadOrderSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadOrderFail)
    loadOrdersUnityFail(ctx: StateContext<OrderStateModel>, {payload}: LoadOrderFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadOrders)
    loadOrders(ctx: StateContext<OrderStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.orderResource.find().pipe(
            map((Order: OrderModel[]) => ctx.dispatch(new LoadOrdersSuccess(Order))),
            catchError((error) => ctx.dispatch(new LoadOrdersFail(error)))
        );
    }

    @Action(LoadOrdersSuccess)
    loadOrdersSuccess(ctx: StateContext<OrderStateModel>, {payload}: LoadOrdersSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadOrdersFail)
    loadOrdersFail(ctx: StateContext<OrderStateModel>, {payload}: LoadOrdersFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(AddItem)
    addItem(ctx: StateContext<OrderStateModel>, action: AddItem) {
        ctx.patchState({isLoading: true});
        return this.orderResource.create(action.payload).pipe(
            map((Order: OrderModel) => ctx.dispatch(new AddItemSuccess(Order))),
            catchError((error) => ctx.dispatch(new AddItemFail(error)))
        );
    }

    @Action(AddItemSuccess)
    addItemSuccess(ctx: StateContext<OrderStateModel>, {payload}: AddItemSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Carrinho atualizado com sucesso!');
    }

    @Action(AddItemFail)
    addItemFail(ctx: StateContext<OrderStateModel>, {payload}: AddItemFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateDiscount)
    updateDiscount(ctx: StateContext<OrderStateModel>, action: UpdateDiscount) {
        ctx.patchState({isLoading: true});
        return this.orderResource.updateDiscount(action.payload).pipe(
            map((Order: OrderModel) => ctx.dispatch(new UpdateDiscountSuccess(Order))),
            catchError((error) => ctx.dispatch(new UpdateDiscountFail(error)))
        );
    }

    @Action(UpdateDiscountSuccess)
    updateDiscountSuccess(ctx: StateContext<OrderStateModel>, {payload}: UpdateDiscountSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Carrinho atualizado com sucesso!');
    }

    @Action(UpdateDiscountFail)
    updateDiscountFail(ctx: StateContext<OrderStateModel>, {payload}: UpdateDiscountFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateItem)
    updateItem(ctx: StateContext<OrderStateModel>, action: UpdateItem) {
        ctx.patchState({isLoading: true});
        return this.orderResource.update(action.payload).pipe(
            map((Order: OrderModel) => ctx.dispatch(new UpdateItemSuccess(Order))),
            catchError((error) => ctx.dispatch(new UpdateItemFail(error)))
        );
    }

    @Action(UpdateItemSuccess)
    updateItemSuccess(ctx: StateContext<OrderStateModel>, {payload}: UpdateItemSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Carrinho atualizado com sucesso!');
    }

    @Action(UpdateItemFail)
    updateItemFail(ctx: StateContext<OrderStateModel>, {payload}: UpdateItemFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(RemoveItem)
    removeItem(ctx: StateContext<OrderStateModel>, action: RemoveItem) {
        ctx.patchState({isLoading: true});
        return this.orderResource.destroy(action.payload).pipe(
            map((Order: OrderModel) => ctx.dispatch(new RemoveItemSuccess(Order))),
            catchError((error) => ctx.dispatch(new RemoveItemFail(error)))
        );
    }

    @Action(RemoveItemSuccess)
    removeItemSuccess(ctx: StateContext<OrderStateModel>, {payload}: RemoveItemSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Carrinho atualizado com sucesso!');
    }

    @Action(RemoveItemFail)
    removeItemFail(ctx: StateContext<OrderStateModel>, {payload}: RemoveItemFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateReceivables)
    createReceivables(ctx: StateContext<OrderStateModel>, action: CreateReceivables) {
        ctx.patchState({isLoading: true});
        return this.orderResource.createReceivables(action.payload).pipe(
            map((Order: OrderModel) => ctx.dispatch(new CreateReceivablesSuccess(Order))),
            catchError((error) => ctx.dispatch(new CreateReceivablesFail(error)))
        );
    }

    @Action(CreateReceivablesSuccess)
    createReceivablesSuccess(ctx: StateContext<OrderStateModel>, {payload}: CreateReceivablesSuccess) {
        NgxsEntityStateAdapter.select(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Parcelas geradas com sucesso!');
        this.store.dispatch(new CloseCardPaymentModal());
        ctx.dispatch(new Navigate(['/main/cashier']));
    }

    @Action(CreateReceivablesFail)
    createReceivablesFail(ctx: StateContext<OrderStateModel>, {payload}: CreateReceivablesFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    async presentToast(msg, type: string = 'success') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: type
        });
        toast.present();
    }
}
