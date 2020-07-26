import {Component, Input, OnInit} from '@angular/core';

import {DailyModel} from '../../../shared/models/daily.model';

@Component({
    selector: 'app-total-days-hotel',
    templateUrl: './total-days-hotel.page.html',
    styleUrls: ['./total-days-hotel.page.scss'],
})
export class TotalDaysHotelPage implements OnInit {

    @Input() isLoading: boolean;

    @Input() daily: DailyModel;

    constructor() {
    }

    ngOnInit() {
    }
}
