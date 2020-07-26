import {Component, OnInit} from '@angular/core';

import {CashierSandbox} from '../../../cashier/cashier.sandbox';
import {PetSandbox} from '../../../pet/pet.sandbox';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    public cashierSelected$ = this.cashierSandbox.cashierSelected$;

    public receivablesCollection$ = this.cashierSandbox.receivablesCollection$;

    public vaccinesCollection$ = this.petSandbox.vaccinesCollection$;

    public totals$ = this.cashierSandbox.totals$;

    constructor(private cashierSandbox: CashierSandbox,
                private petSandbox: PetSandbox) {
    }

    ngOnInit() {
        this.cashierSandbox.LoadReceivablesTotals();
        this.cashierSandbox.loadCashiers();
        this.cashierSandbox.loadReceivables('NOT_RECEIVED');
        this.petSandbox.loadPetVaccines();
    }

    openPetProfile($event) {
        this.petSandbox.openModalProfile($event);
        this.petSandbox.loadEvaluations($event);
    }

}
