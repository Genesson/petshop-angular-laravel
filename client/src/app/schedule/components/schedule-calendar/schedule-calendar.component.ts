import {
    Component,
    EventEmitter,
    Inject,
    Input,
    LOCALE_ID,
    OnInit,
    Output,
    OnChanges,
} from '@angular/core';
import {formatDate} from '@angular/common';

import {SimpleChanges} from '@angular/core';

import {AlertController} from '@ionic/angular';

import {ScheduleModel} from '../../../shared/models/schedule.model';

@Component({
    selector: 'app-schedule-calendar',
    templateUrl: './schedule-calendar.component.html',
    styleUrls: ['./schedule-calendar.component.scss'],
})
export class ScheduleCalendarComponent implements OnInit, OnChanges {
    @Input() schedule: ScheduleModel[];

    @Input() currentDate: Date;

    @Output() changeDate = new EventEmitter();

    public eventSource = [];

    constructor(
        private alertCtrl: AlertController,
        @Inject(LOCALE_ID) private locale: string
    ) {}

    ngOnInit() {}

    changedDate($event) {
        this.changeDate.emit($event);
    }

    async onEventSelected(event) {
        const start = formatDate(event.startTime, 'medium', this.locale);
        const end = formatDate(event.endTime, 'medium', this.locale);

        const alert = await this.alertCtrl.create({
            header: event.title,
            subHeader: event.desc,
            message: 'De: ' + start + '<br>Até: ' + end,
            buttons: ['OK'],
        });
        alert.present();
    }

    ngOnChanges(change: SimpleChanges) {
        if (change.schedule && change.schedule.currentValue) {
            const events = [];
            change.schedule.currentValue.forEach((event) => {
                const eventSchedule = {
                    title: event.title,
                    startTime: new Date(event.startTime),
                    endTime: new Date(event.endTime),
                    allDay: event.allDay,
                    desc: '',
                };
                events.push(eventSchedule);
            });
            this.eventSource = events;
        }
    }
}
