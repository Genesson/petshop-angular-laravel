import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {ServiceModel} from '../../../shared/models/service.model';

@Component({
    selector: 'app-schedule-filter',
    templateUrl: './schedule-filter.component.html',
    styleUrls: ['./schedule-filter.component.scss'],
})
export class ScheduleFilterComponent implements OnInit {

    @Input() currentDate: Date;

    @Input() services: ServiceModel[];

    @Output() clickView = new EventEmitter();

    @Output() backDate = new EventEmitter();

    @Output() forwardDate = new EventEmitter();

    @Output() changeFilter = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
