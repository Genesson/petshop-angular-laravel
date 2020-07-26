import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-schedule-tabs',
    templateUrl: './schedule-tabs.component.html',
    styleUrls: ['./schedule-tabs.component.scss'],
})
export class ScheduleTabsComponent implements OnInit {

    @Input() selected: string;

    @Output() tab = new EventEmitter();

    constructor() {
    }

    ngOnInit() {
    }

}
