import {Component, OnInit} from '@angular/core';

import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {CartSandbox} from '../../cart.sandbox';

import {ReceivableModel} from '../../../shared/models/receivable.model';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.page.html',
    styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

    public orderSelected$ = this.cartSandbox.orderSelected$;

    public isLoading$ = this.cartSandbox.isLoading$;

    public formGroup: FormGroup;

    public arrayReceivables: ReceivableModel[] = [];

    constructor(private formBuilder: FormBuilder,
                private cartSandbox: CartSandbox) {
        this.formGroup = this.formBuilder.group({
            id: [null],
            order: [null, [Validators.required]],
            value: [null, [Validators.required]],
            payment_form: ['VISTA', [Validators.required]],
            quotas: [1, [Validators.required]],
            payment_with: ['DINHEIRO', [Validators.required]],
            receivables: new FormArray([])
        });
    }

    ngOnInit() {
        this.cartSandbox.loadOrder();
    }

    get receivables(): FormArray {
        return this.formGroup.get('receivables') as FormArray;
    }

    public applyDiscount($event) {
        this.cartSandbox.updateDiscount($event);
    }

    public changeQuantityItem($event) {
        this.cartSandbox.updateQuantityItem($event);
    }

    public onClickDelete($event) {
        this.cartSandbox.removeItem($event);
    }

    public onClickPayLater($event) {
        this.formGroup.get('order').patchValue($event.id);
        this.formGroup.get('value').patchValue($event.amount);
        this.changeQuota($event.amount);
        if (this.formGroup.valid) {
            this.cartSandbox.createReceivables(this.formGroup.value);
        }
    }

    public onClickReceive($event) {
        this.cartSandbox.openCardPaymentModal($event);
    }

    public changeQuota(amount) {
        this.arrayReceivables = [];

        const receivable = {
            quota: '1 de 1',
            expiration: this.currentDate(),
            value: Math.round(amount * 100) / 100,
        };
        this.arrayReceivables.push(receivable as ReceivableModel);
        this.receivables.push(this.formBuilder.control(receivable as ReceivableModel));
    }

    private currentDate() {
        const data = new Date(),
            dia = data.getDate().toString().padStart(2, '0'),
            mes = (data.getMonth() + 1).toString().padStart(2, '0'),
            ano = data.getFullYear();
        return dia + '/' + mes + '/' + ano;
    }
}
