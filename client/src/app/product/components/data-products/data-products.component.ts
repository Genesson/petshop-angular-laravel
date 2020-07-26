import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {XmlModel} from '../../../shared/models/xml.model';

@Component({
    selector: 'app-data-products',
    templateUrl: './data-products.component.html',
    styleUrls: ['./data-products.component.scss'],
})
export class DataProductsComponent implements OnInit {

    @Input() xml: XmlModel;

    @Output() selectXml = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

    onClickConfirm() {
        this.selectXml.emit(this.xml);
    }
}
