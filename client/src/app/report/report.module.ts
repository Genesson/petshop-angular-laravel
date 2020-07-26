import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {BrMaskerModule} from 'br-mask';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {NgxsModule} from '@ngxs/store';

import {ReportRoutingModule} from './routers/report-routing.module';

import {HeaderModule} from '../shared/components/header/header.module';
import {HeaderModalModule} from '../shared/components/header-modal/header-modal.module';
import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';
import {FooterModalModule} from '../shared/components/footer-modal/footer-modal.module';
import {FooterButtonModule} from '../shared/components/footer-button/footer-button.module';

import {DreState} from './state/dre/dre.state';
import {DreModalState} from './state/dre-modal/dre-modal.state';

import {DreModalService} from './services/dre-modal.service';

import {ReportPage} from './containers/report/report.page';
import {DreCreatePage} from './components/dre-create/dre-create.page';
import {DreFilterComponent} from './components/dre-filter/dre-filter.component';
import {DreDatatableComponent} from './components/dre-datatable/dre-datatable.component';

@NgModule({
    declarations: [
        ReportPage,
        DreCreatePage,
        DreFilterComponent,
        DreDatatableComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        ReportRoutingModule,
        HeaderModule,
        HeaderModalModule,
        ValidationMessageModule,
        FooterModalModule,
        NgxsModule.forFeature([DreState, DreModalState]),
        BrMaskerModule,
        NgxDatatableModule,
        FooterButtonModule,
    ],
    providers: [DreModalService, DatePipe],
    entryComponents: [DreCreatePage],
})
export class ReportModule {}
