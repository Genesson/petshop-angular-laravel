import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {OrderModel} from '../../../shared/models/order.model';

@Component({
    selector: 'app-cart-total',
    templateUrl: './cart-total.page.html',
    styleUrls: ['./cart-total.page.scss'],
})
export class CartTotalPage implements OnInit {

    @Input() order: OrderModel;

    @Input() isLoading = false;

    @Output() clickPayLater = new EventEmitter();

    @Output() clickReceive = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
