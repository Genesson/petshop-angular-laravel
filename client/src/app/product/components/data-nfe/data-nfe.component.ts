import {Component, Input, OnInit} from '@angular/core';

import {XmlModel} from '../../../shared/models/xml.model';

@Component({
    selector: 'app-data-nfe',
    templateUrl: './data-nfe.component.html',
    styleUrls: ['./data-nfe.component.scss'],
})
export class DataNfeComponent implements OnInit {

    @Input() xml: XmlModel;

    public rows = [{}];

    constructor() {
    }

    ngOnInit() {
    }

}
