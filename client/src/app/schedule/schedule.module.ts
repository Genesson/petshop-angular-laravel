import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {NgCalendarModule} from 'ionic2-calendar';

import {NgxsModule} from '@ngxs/store';

import {ScheduleRoutingModule} from './routers/schedule-routing.module';

import {ScheduleListModalService} from './services/schedule-list-modal.service';

import {ScheduleState} from './state/schedule/schedule.state';
import {ScheduleListModalState} from './state/schedule-list-modal/schedule-list-modal.state';

import {SessionModule} from '../session/session.module';
import {HeaderModule} from '../shared/components/header/header.module';

import {SchedulePage} from './containers/schedule/schedule.page';
import {ScheduleListPage} from './containers/schedule-list/schedule-list.page';
import {ScheduleCalendarComponent} from './components/schedule-calendar/schedule-calendar.component';
import {ScheduleFilterComponent} from './components/schedule-filter/schedule-filter.component';
import {ScheduleFilterListComponent} from './components/schedule-filter-list/schedule-filter-list.component';
import {ScheduleTabsComponent} from './components/schedule-tabs/schedule-tabs.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@NgModule({
    declarations: [
        SchedulePage,
        ScheduleListPage,
        ScheduleCalendarComponent,
        ScheduleFilterComponent,
        ScheduleFilterListComponent,
        ScheduleTabsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        ScheduleRoutingModule,
        SessionModule,
        NgxDatatableModule,
        NgCalendarModule,
        BsDatepickerModule,
        NgxsModule.forFeature([
            ScheduleState,
            ScheduleListModalState
        ]),
        HeaderModule
    ],
    providers: [
        ScheduleListModalService
    ],
    entryComponents: [
        ScheduleListPage
    ]
})
export class ScheduleModule {
}
