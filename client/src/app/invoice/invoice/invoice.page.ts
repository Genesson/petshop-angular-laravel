import {Component, OnInit} from '@angular/core';

import {InvoiceSandbox} from '../invoice.sandbox';

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.page.html',
    styleUrls: ['./invoice.page.scss'],
})
export class InvoicePage implements OnInit {
    nfcesCollection$ = this.invoiceSandbox.nfcesCollection$;

    nfsesCollection$ = this.invoiceSandbox.nfsesCollection$;

    isLoadingNfce$ = this.invoiceSandbox.isLoadingNfce$;

    isLoadingNfse$ = this.invoiceSandbox.isLoadingNfse$;

    paginatorNfce$ = this.invoiceSandbox.paginatorNfce$;

    paginatorNfse$ = this.invoiceSandbox.paginatorNfse$;

    public tab = 'NFCE';

    public nfceCollection = [
        {
            id: 50,
            date: '23/02/2020 - 10:23',
            value: 'R$ 34,90',
            status: 'Autorizada',
        },
        {
            id: 51,
            date: '23/02/2020 - 10:23',
            value: 'R$ 34,90',
            status: 'Autorizada',
        },
        {
            id: 52,
            date: '23/02/2020 - 10:23',
            value: 'R$ 34,90',
            status: 'Cancelada',
        },
        {
            id: 53,
            date: '23/02/2020 - 10:23',
            value: 'R$ 34,90',
            status: 'Rejeitada',
        },
    ];

    public nfseCollection = [
        {
            id: 50,
            date: '23/02/2020 - 10:23',
            value: 'R$ 34,90',
            status: 'Autorizada',
        },
        {
            id: 51,
            date: '23/02/2020 - 10:23',
            value: 'R$ 34,90',
            status: 'Autorizada',
        },
        {
            id: 52,
            date: '23/02/2020 - 10:23',
            value: 'R$ 34,90',
            status: 'Cancelada',
        },
        {
            id: 53,
            date: '23/02/2020 - 10:23',
            value: 'R$ 34,90',
            status: 'Rejeitada',
        },
    ];

    constructor(private invoiceSandbox: InvoiceSandbox) {}

    ngOnInit() {
      this.invoiceSandbox.loadNfces(1);
    }

    changePage(page) {
      this.invoiceSandbox.loadNfces(page);
    }

    public onTab(tab) {
        this.tab = tab;
    }

    public selectNfce(row) {
        console.log(row);
    }

    public selectNfse(row) {
        console.log(row);
    }
}
