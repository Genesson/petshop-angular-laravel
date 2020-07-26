import {Component, Input, OnInit} from '@angular/core';

import {CashierModel} from '../../../shared/models/cashier.model';

@Component({
    selector: 'app-cashier-cards',
    templateUrl: './cashier-cards.component.html',
    styleUrls: ['./cashier-cards.component.scss'],
})
export class CashierCardsComponent implements OnInit {

    @Input() totals: { received: number, receivableToday: number, receivable: number };

    @Input() cashier: CashierModel;

    constructor() {
    }

    ngOnInit() {
    }

}
