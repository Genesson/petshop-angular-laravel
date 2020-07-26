import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {BrMaskerModule} from 'br-mask';

import {NgxsModule} from '@ngxs/store';

import {CashierRoutingModule} from './routers/cashier-routing.module';

import {ReceiveModalService} from './services/receive-modal.service';
import {CashierModalService} from './services/cashier-modal.service';

import {CashierState} from './state/cashier/cashier.state';
import {PayableState} from './state/payable/payable.state';
import {ReceivableState} from './state/receivable/receivable.state';
import {ReceiveModalState} from './state/receive-modal/receive-modal.state';
import {CashierModalState} from './state/cashier-modal/cashier-modal.state';

import {HeaderModule} from '../shared/components/header/header.module';
import {HeaderModalModule} from '../shared/components/header-modal/header-modal.module';
import {FooterModalModule} from '../shared/components/footer-modal/footer-modal.module';
import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';

import {CashierPage} from './containers/cashier/cashier.page';
import {CashierReceivePage} from './containers/cashier-receive/cashier-receive.page';
import {CashierReceiveViewPage} from './containers/cashier-receive-view/cashier-receive-view.page';
import {CashierModalPage} from './containers/cashier-modal/cashier-modal.page';
import {CashierCardComponent} from './components/cashier-card/cashier-card.component';
import {CashierCardsComponent} from './components/cashier-cards/cashier-cards.component';
import {CashierTabsComponent} from './components/cashier-tabs/cashier-tabs.component';
import {CashierButtonsComponent} from './components/cashier-buttons/cashier-buttons.component';

@NgModule({
    declarations: [
        CashierPage,
        CashierReceivePage,
        CashierReceiveViewPage,
        CashierModalPage,
        CashierCardComponent,
        CashierCardsComponent,
        CashierTabsComponent,
        CashierButtonsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgxDatatableModule,
        BrMaskerModule,
        CashierRoutingModule,
        NgxsModule.forFeature([
            CashierState,
            PayableState,
            ReceivableState,
            ReceiveModalState,
            CashierModalState
        ]),
        HeaderModule,
        HeaderModalModule,
        FooterModalModule,
        ValidationMessageModule
    ],
    providers: [
        ReceiveModalService,
        CashierModalService
    ],
    exports: [
        CashierCardsComponent
    ],
    entryComponents: [
        CashierReceivePage,
        CashierReceiveViewPage,
        CashierModalPage
    ]
})
export class CashierModule {
}
