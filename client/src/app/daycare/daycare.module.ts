import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {NgxsModule} from '@ngxs/store';

import {DaycareModalState} from './state/daycare-modal/daycare-modal.state';
import {HotelListModalState} from './state/hotel-list-modal/hotel-list-modal.state';

import {DaycareModalService} from './services/daycare-modal.service';
import {HotelListModalService} from './services/hotel-list-modal.service';

import {DaycareRoutingModule} from './routers/daycare-routing.module';
import {HeaderModule} from '../shared/components/header/header.module';
import {SessionModule} from '../session/session.module';

import {DailyPage} from './containers/daily/daily.page';
import {DaycarePage} from './containers/daycare/daycare.page';
import {DaycareCheckPage} from './containers/daycare-check/daycare-check.page';
import {DaycareClassPage} from './containers/daycare-class/daycare-class.page';
import {DailyCardsPage} from './components/daily-cards/daily-cards.page';
import {HotelListPage} from './containers/hotel-list/hotel-list.page';
import {DaycareButtonsPage} from './components/daycare-buttons/daycare-buttons.page';
import {HotelFilterListComponent} from './components/hotel-filter-list/hotel-filter-list.component';

@NgModule({
    declarations: [
        DailyPage,
        DaycarePage,
        DaycareCheckPage,
        DaycareClassPage,
        DailyCardsPage,
        HotelListPage,
        DaycareButtonsPage,
        HotelFilterListComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgxDatatableModule,
        DaycareRoutingModule,
        SessionModule,
        NgxsModule.forFeature([
            DaycareModalState,
            HotelListModalState
        ]),
        HeaderModule
    ],
    providers: [
        DaycareModalService,
        HotelListModalService
    ],
    entryComponents: [
        DaycarePage,
        DaycareCheckPage,
        DaycareClassPage,
        HotelListPage
    ]
})
export class DaycareModule {
}
