import {Component, OnInit} from '@angular/core';

import {DaycareSandbox} from '../../daycare.sandbox';
import {UnitySandbox} from '../../../unity/unity.sandbox';
import {ScheduleSandbox} from '../../../schedule/schedule.sandbox';
import {SessionSandbox} from '../../../session/session.sandbox';

import {ServiceModel} from '../../../shared/models/service.model';

@Component({
    selector: 'app-daily',
    templateUrl: './daily.page.html',
    styleUrls: ['./daily.page.scss'],
})
export class DailyPage implements OnInit {

    public servicesCollection$ = this.unitySandbox.servicesCollection$;

    public rows: any[];

    public userData = this.sessionSandbox.userData;

    constructor(private daycareSandbox: DaycareSandbox,
                private unitySandbox: UnitySandbox,
                private scheduleSandbox: ScheduleSandbox,
                private sessionSandbox: SessionSandbox) {
    }

    ngOnInit() {
        this.unitySandbox.setUnity(this.userData.unityFull).finally(() => {
            setTimeout(() => {
                this.unitySandbox.loadServicesUnity();
            }, 1000);
        });
        setTimeout(() => {
            this.rows = [
                {
                    id: 0,
                    turmas: 'Banho e tosa',
                    cachorros: '18 Cachorros'
                },
                {
                    id: 1,
                    turmas: 'Transporte',
                    cachorros: '18 Cachorros'
                },
                {
                    id: 2,
                    turmas: 'Hotel',
                    cachorros: '13 Cachorros'
                },
                {
                    id: 3,
                    turmas: 'Daycare',
                    cachorros: '18 Cachorros'
                },
                {
                    id: 4,
                    turmas: 'Pet Sitter',
                    cachorros: '12 Cachorros'
                }
            ];
        }, 500);
    }

    openDaycare() {
        this.daycareSandbox.openModalDaycare();
    }

    openClass() {
        this.daycareSandbox.openModalDaycareClass();
    }

    openCheck() {
        this.daycareSandbox.openModalDaycareCheck();
    }

    openHotel() {
        this.daycareSandbox.openModalHotelList();
    }

    openList(event: ServiceModel) {
        if (event.type === 'DAY_CARE') {
            return this.openCheck();
        }
        if (event.type === 'HOTEL') {
            return this.openHotel();
        }
        this.unitySandbox.selectService(event);
        this.scheduleSandbox.openScheduleListModal();
    }
}
