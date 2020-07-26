import {Component, OnInit} from '@angular/core';

import {DaycareSandbox} from '../../daycare.sandbox';

@Component({
    selector: 'app-daycare',
    templateUrl: './daycare.page.html',
    styleUrls: ['./daycare.page.scss'],
})
export class DaycarePage implements OnInit {

    public rows: any[];

    constructor(private daycareSandbox: DaycareSandbox) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.rows = [
                {
                    id: 0,
                    turmas: 'Domingo',
                    cachorros: '18 Cachorros'
                },
                {
                    id: 1,
                    turmas: 'Segunda-Feira',
                    cachorros: '18 Cachorros'
                },
                {
                    id: 2,
                    turmas: 'Terça-Feira',
                    cachorros: '13 Cachorros'
                },
                {
                    id: 3,
                    turmas: 'Quarta-Feira',
                    cachorros: '18 Cachorros'
                },
                {
                    id: 4,
                    turmas: 'Quinta-Feira',
                    cachorros: '12 Cachorros'
                },
                {
                    id: 5,
                    turmas: 'Sexta-Feira',
                    cachorros: '1 Cachorros'
                },
                {
                    id: 6,
                    turmas: 'Sábado',
                    cachorros: '3 Cachorros'
                },
                {
                    id: 7,
                    turmas: 'Adestramento',
                    cachorros: '3 Cachorros'
                }
            ];
        }, 500);
    }

    selectDaycare() {
        this.daycareSandbox.openModalDaycareClass();
    }

    openModalDaycareCheck() {
        this.daycareSandbox.openModalDaycareCheck();
    }
}
