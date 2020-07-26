import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-product-tabs',
    templateUrl: './product-tabs.component.html',
    styleUrls: ['./product-tabs.component.scss'],
})
export class ProductTabsComponent implements OnInit {

    @Input() selected: string;

    @Output() tab = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
