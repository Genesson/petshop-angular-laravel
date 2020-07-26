import {Component, Input, OnInit} from '@angular/core';

import {ProductSandbox} from '../../product.sandbox';

import {ProductModel} from '../../../shared/models/product.model';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.page.html',
    styleUrls: ['./product-view.page.scss'],
})
export class ProductViewPage implements OnInit {

    @Input() product: ProductModel;

    constructor(private productSandbox: ProductSandbox) {
    }

    ngOnInit() {
    }
}
