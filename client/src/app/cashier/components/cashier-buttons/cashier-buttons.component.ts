import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {CashierModel} from '../../../shared/models/cashier.model';

@Component({
    selector: 'app-cashier-buttons',
    templateUrl: './cashier-buttons.component.html',
    styleUrls: ['./cashier-buttons.component.scss'],
})
export class CashierButtonsComponent implements OnInit {

    @Input() cashier: CashierModel;

    @Output() clickOpen = new EventEmitter();

    @Output() clickClose = new EventEmitter();

    @Output() clickBleed = new EventEmitter();

    @Output() clickReinforce = new EventEmitter();

    @Output() clickCart = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
