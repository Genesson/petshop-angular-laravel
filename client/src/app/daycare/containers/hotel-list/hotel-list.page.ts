import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {Subscription} from 'rxjs';

import {DatatableComponent} from '@swimlane/ngx-datatable';

import {UnitySandbox} from '../../../unity/unity.sandbox';

import {ScheduleModel} from '../../../shared/models/schedule.model';
import {ScheduleSandbox} from '../../../schedule/schedule.sandbox';

@Component({
    selector: 'app-hotel-list',
    templateUrl: './hotel-list.page.html',
    styleUrls: ['./hotel-list.page.scss'],
})
export class HotelListPage implements OnInit, OnDestroy {

    public servicesCollection$ = this.unitySandbox.servicesCollection$;

    public schedulesCollection$ = this.scheduleSandbox.schedulesHotelCollection$;

    public isLoading$ = this.scheduleSandbox.isLoadingSchedule$;

    private subscriptions = new Subscription();

    @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

    temp = [];

    rows = [];

    constructor(private scheduleSandbox: ScheduleSandbox,
                private unitySandbox: UnitySandbox) {
    }

    ngOnInit() {
        this.unitySandbox.loadServicesUnity();
        this.scheduleSandbox.loadSchedules();
        this.loadSchedule();
    }

    loadSchedule() {
        this.subscriptions.add(
            this.schedulesCollection$.subscribe(data => {
                this.temp = [...data];
                this.rows = data;
            })
        );
    }

    updateFilterPetName(event) {
        this.loadSchedule();
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter((d: ScheduleModel) => {
            return d.pet.name.toLowerCase().indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }

    updateFilterDate(event) {
        this.loadSchedule();
        const val = event.detail.value.substr(0, 10);
        const temp = this.temp.filter((d: ScheduleModel) => {
            return d.date_checkin.indexOf(val) !== -1 || d.date_checkout.indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }

    updateFilter(event) {
        this.loadSchedule();
        if (event.pet) {
            const pet = event.pet.toLowerCase();
            this.temp = this.temp.filter((d: ScheduleModel) => {
                return d.pet.name.toLowerCase().indexOf(pet) !== -1 || !pet;
            });
        }
        if (event.date) {
            const date = event.date.substr(0, 10);
            this.temp = this.temp.filter((d: ScheduleModel) => {
                return d.date_checkin.indexOf(date) !== -1 || d.date_checkout.indexOf(date) !== -1 || !date;
            });
        }
        this.rows = this.temp;
        this.table.offset = 0;
    }

    finishedSchedule(schedule) {
        this.scheduleSandbox.finishedSchedule(schedule);
    }

    deleteSchedule(schedule) {
        this.scheduleSandbox.deleteSchedule(schedule);
    }

    ngOnDestroy() {
        this.subscriptions.unsubscribe();
    }
}
