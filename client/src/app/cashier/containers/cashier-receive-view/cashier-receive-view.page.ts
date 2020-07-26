import {Component, Input, OnInit} from '@angular/core';

import {CashierSandbox} from '../../cashier.sandbox';

import {ReceivableModel} from '../../../shared/models/receivable.model';

@Component({
    selector: 'app-cashier-receive-view',
    templateUrl: './cashier-receive-view.page.html',
    styleUrls: ['./cashier-receive-view.page.scss'],
})
export class CashierReceiveViewPage implements OnInit {

    @Input() data: ReceivableModel;

    constructor(private cashierSandbox: CashierSandbox) {
    }

    ngOnInit() {
    }

    public onClickCancel() {
        this.cashierSandbox.closeReceiveViewModal();
    }

    public onClickConfirm() {
        this.cashierSandbox.closeReceiveViewModal();
    }
}
