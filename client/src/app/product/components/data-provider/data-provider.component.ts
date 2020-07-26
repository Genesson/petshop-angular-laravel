import {Component, Input, OnInit} from '@angular/core';

import {XmlModel} from '../../../shared/models/xml.model';

@Component({
    selector: 'app-data-provider',
    templateUrl: './data-provider.component.html',
    styleUrls: ['./data-provider.component.scss'],
})
export class DataProviderComponent implements OnInit {

    @Input() xml: XmlModel;

    public rows = [{}];

    constructor() {
    }

    ngOnInit() {
    }

}
