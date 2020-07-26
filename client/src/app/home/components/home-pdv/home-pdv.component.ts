import {Component, Input, OnInit} from '@angular/core';

import {ReceivableModel} from '../../../shared/models/receivable.model';

@Component({
    selector: 'app-home-pdv',
    templateUrl: './home-pdv.component.html',
    styleUrls: ['./home-pdv.component.scss'],
})
export class HomePdvComponent implements OnInit {

    @Input() receivables: ReceivableModel[];

    constructor() {
    }

    ngOnInit() {
    }

}
