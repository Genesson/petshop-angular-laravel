import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {OrderModel} from '../../../shared/models/order.model';

@Component({
    selector: 'app-cart-discount',
    templateUrl: './cart-discount.page.html',
    styleUrls: ['./cart-discount.page.scss'],
})
export class CartDiscountPage implements OnInit {

    @Input() order: OrderModel;

    @Output() applyDiscount = new EventEmitter();

    public discount = 0;

    constructor() {
    }

    ngOnInit() {
    }

    calculeDiscount(value) {
        if (this.checkPercentOrValue(value)) {
            this.discount = value.replace(',', '.');
        } else {
            this.discount = (value * this.order.amount) / 100;
        }
        this.applyDiscount.emit(Math.round(this.discount * 100) / 100);
    }

    checkPercentOrValue(value) {
        return value.indexOf(',') !== -1;
    }

}
