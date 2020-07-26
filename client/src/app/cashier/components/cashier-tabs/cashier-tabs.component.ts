import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-cashier-tabs',
    templateUrl: './cashier-tabs.component.html',
    styleUrls: ['./cashier-tabs.component.scss'],
})
export class CashierTabsComponent implements OnInit {

    @Input() selected: string;

    @Output() tab = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
