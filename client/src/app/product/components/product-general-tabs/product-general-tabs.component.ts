import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-product-general-tabs',
    templateUrl: './product-general-tabs.component.html',
    styleUrls: ['./product-general-tabs.component.scss'],
})
export class ProductGeneralTabsComponent implements OnInit {

    @Input() selected: string;

    @Output() tab = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
