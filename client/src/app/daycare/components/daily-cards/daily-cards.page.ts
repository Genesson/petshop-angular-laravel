import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ServiceModel} from '../../../shared/models/service.model';

@Component({
    selector: 'app-daily-cards',
    templateUrl: './daily-cards.page.html',
    styleUrls: ['./daily-cards.page.scss'],
})
export class DailyCardsPage implements OnInit {

    @Input() services: ServiceModel[];

    @Output() buttonClick = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }
}
