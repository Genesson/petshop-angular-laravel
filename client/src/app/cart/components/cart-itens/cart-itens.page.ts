import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {OrderModel} from '../../../shared/models/order.model';

@Component({
    selector: 'app-cart-itens',
    templateUrl: './cart-itens.page.html',
    styleUrls: ['./cart-itens.page.scss'],
})
export class CartItensPage implements OnInit {

    @Input() order: OrderModel;

    @Output() delete = new EventEmitter();

    @Output() changeQuantityItem = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
