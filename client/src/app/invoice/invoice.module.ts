import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxsModule} from '@ngxs/store';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {InvoiceRoutingModule} from './routers/invoice-routing.module';
import {HeaderModule} from '../shared/components/header/header.module';

import {NfceState} from './state/nfce/nfce.state';
import {NfseState} from './state/nfse/nfse.state';

import {InvoicePage} from './invoice/invoice.page';
import {InvoiceTabsComponent} from './components/invoice-tabs/invoice-tabs.component';

@NgModule({
    declarations: [InvoicePage, InvoiceTabsComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        InvoiceRoutingModule,
        NgxDatatableModule,
        NgxsModule.forFeature([NfceState, NfseState]),
        HeaderModule,
    ],
    providers: [],
    entryComponents: [],
})
export class InvoiceModule {}
