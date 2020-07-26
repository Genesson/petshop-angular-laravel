import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';

import {DatatableComponent} from '@swimlane/ngx-datatable';

import {Subscription} from 'rxjs';

import {ScheduleSandbox} from '../../schedule.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';
import {UserSandbox} from '../../../user/user.sandbox';
import {ScheduleModel} from '../../../shared/models/schedule.model';

@Component({
    selector: 'app-schedule-list',
    templateUrl: './schedule-list.page.html',
    styleUrls: ['./schedule-list.page.scss'],
})
export class ScheduleListPage implements OnInit, OnDestroy {
    public schedulesCollection$ = this.scheduleSandbox.schedulesCollection$;

    public schedulesListCollection$ = this.scheduleSandbox
        .schedulesListCollection$;

    public servicesCollection$ = this.unitySandbox
        .servicesNotDaycareAndHotelCollection$;

    public serviceSelected$ = this.unitySandbox.serviceSelected$;

    public usersCollection$ = this.userSandbox.usersCollection$;

    public isLoading$ = this.scheduleSandbox.isLoadingSchedule$;

    private subscriptions = new Subscription();

    @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

    temp = [];

    rows = [];

    constructor(
        private scheduleSandbox: ScheduleSandbox,
        private unitySandbox: UnitySandbox,
        private userSandbox: UserSandbox
    ) {}

    ngOnInit() {
        this.scheduleSandbox.loadSchedules();
        this.unitySandbox.loadServicesUnity();
        this.userSandbox.loadUsers();
        this.loadSchedule();
    }

    loadSchedule() {
        this.subscriptions.add(
            this.schedulesListCollection$.subscribe((data) => {
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

    updateFilterService(event) {
        this.loadSchedule();
        const val = event.detail
            ? event.detail.value.toLowerCase()
            : event.toLowerCase();
        const temp = this.temp.filter((d: ScheduleModel) => {
            return (
                d.service.description.toLowerCase().indexOf(val) !== -1 || !val
            );
        });
        this.rows = temp;
        this.table.offset = 0;
    }

    updateFilterDate(event) {
        this.loadSchedule();
        const val = this.formatDate(event);
        const temp = this.temp.filter((d: ScheduleModel) => {
            return d.date.indexOf(val) !== -1 || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }

    formatDate(d) {
      const date = new Date(d)
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yyyy = date.getFullYear();
      return ((dd < 10) ? '0' + dd : dd) + '/' + ((mm < 10) ? '0' + mm : mm) + '/' + yyyy;
    }

    updateFilterResponsible(event) {
        this.loadSchedule();
        const val = event.detail.value.toLowerCase();
        const temp = this.temp.filter((d: ScheduleModel) => {
            return d.user.name.toLowerCase().indexOf(val) !== -1 || !val;
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
        if (event.service) {
            const service = event.service.toLowerCase();
            this.temp = this.temp.filter((d: ScheduleModel) => {
                return (
                    d.service.description.toLowerCase().indexOf(service) !==
                        -1 || !service
                );
            });
        }
        if (event.date) {
            const date = this.formatDate(event.date);
            this.temp = this.temp.filter((d: ScheduleModel) => {
                return d.date.indexOf(date) !== -1 || !date;
            });
        }
        if (event.responsible) {
            const responsible = event.responsible.toLowerCase();
            this.temp = this.temp.filter((d: ScheduleModel) => {
                return (
                    d.user.name.toLowerCase().indexOf(responsible) !== -1 ||
                    !responsible
                );
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
