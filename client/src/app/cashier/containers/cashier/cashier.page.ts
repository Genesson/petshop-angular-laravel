import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {CashierSandbox} from '../../cashier.sandbox';

@Component({
    selector: 'app-cashier',
    templateUrl: './cashier.page.html',
    styleUrls: ['./cashier.page.scss'],
})
export class CashierPage implements OnInit {

    public tab = 'receive';

    public cashierSelected$ = this.cashierSandbox.cashierSelected$;

    public receivablesCollection$ = this.cashierSandbox.receivablesCollection$;

    public isLoading$ = this.cashierSandbox.isLoadingReceivable$;

    public total$ = this.cashierSandbox.total$;

    public totals$ = this.cashierSandbox.totals$;

    constructor(private router: Router, private cashierSandbox: CashierSandbox) {
    }

    ngOnInit() {
        this.cashierSandbox.LoadReceivablesTotals();
        this.cashierSandbox.loadCashiers();
        this.cashierSandbox.loadReceivables('NOT_RECEIVED');
    }

    public onTab(tab) {
        this.tab = tab;
        if (this.tab === 'received') {
            this.cashierSandbox.loadReceivables('RECEIVED');
        } else {
            this.cashierSandbox.loadReceivables('NOT_RECEIVED');
        }
    }

    public openCashierModal(action, operation, data) {
        this.cashierSandbox.openCashierModal(action, operation, data);
    }

    public confirmPayment(receivable) {
        this.cashierSandbox.openReceiveModal(receivable);
    }

    public presentViewModal(receivable) {
        this.cashierSandbox.openReceiveViewModal(receivable);
    }

    public openCart() {
        this.router.navigate(['main/cart']);
    }
}
