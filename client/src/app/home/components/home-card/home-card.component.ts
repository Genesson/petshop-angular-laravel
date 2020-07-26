import {Component, Input, OnInit} from '@angular/core';

import {ReceivableModel} from '../../../shared/models/receivable.model';

@Component({
    selector: 'app-home-card',
    templateUrl: './home-card.component.html',
    styleUrls: ['./home-card.component.scss'],
})
export class HomeCardComponent implements OnInit {

    @Input() receivables: ReceivableModel[];

    constructor() {
    }

    ngOnInit() {
    }

}
