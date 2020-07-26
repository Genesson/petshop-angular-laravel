import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-invoice-tabs',
    templateUrl: './invoice-tabs.component.html',
    styleUrls: ['./invoice-tabs.component.scss'],
})
export class InvoiceTabsComponent implements OnInit {
    @Input() selected: string;

    @Output() tab = new EventEmitter();

    constructor() {}

    ngOnInit() {}
}
