import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {BrMaskerModule} from 'br-mask';

import {NgxsModule} from '@ngxs/store';

import {TutorRoutingModule} from './routers/tutor-routing.module';

import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';
import {HeaderModule} from '../shared/components/header/header.module';
import {FooterButtonModule} from '../shared/components/footer-button/footer-button.module';
import {HeaderModalModule} from '../shared/components/header-modal/header-modal.module';
import {FooterModalModule} from '../shared/components/footer-modal/footer-modal.module';
import {CardButtonModule} from '../shared/components/card-button/card-button.module';
import {CardPetModule} from '../shared/components/card-pet/card-pet.module';
import {FileModule} from '../shared/components/file/file.module';
import {ProvinceModule} from '../shared/mokups/province/province.module';
import {CityModule} from '../shared/mokups/city/city.module';
import {ViaCepModule} from '../shared/components/via-cep/via-cep.module';

import {TutorState} from './state/tutor/tutor.state';
import {TutorModalState} from './state/tutor-modal/tutor-modal.state';
import {TutorViewModalState} from './state/tutor-view-modal/tutor-view-modal.state';
import {ResponsibleModalState} from './state/responsible-modal/responsible-modal.state';

import {TutorModalService} from './services/tutor-modal.service';
import {TutorViewModalService} from './services/tutor-view-modal.service';
import {ResponsibleModalService} from './services/responsible-modal.service';

import {TutorPage} from './containers/tutor/tutor.page';
import {TutorCreatePage} from './containers/tutor-create/tutor-create.page';
import {TutorViewPage} from './containers/tutor-view/tutor-view.page';
import {ResponsibleCreatePage} from './containers/responsible-create/responsible-create.page';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@NgModule({
    declarations: [
        TutorPage,
        TutorCreatePage,
        TutorViewPage,
        ResponsibleCreatePage
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgxDatatableModule,
        BsDatepickerModule,
        BrMaskerModule,
        TutorRoutingModule,
        NgxsModule.forFeature([
            TutorState,
            TutorModalState,
            TutorViewModalState,
            ResponsibleModalState
        ]),
        ValidationMessageModule,
        HeaderModule,
        FooterButtonModule,
        HeaderModalModule,
        FooterModalModule,
        CardButtonModule,
        CardPetModule,
        FileModule,
        ProvinceModule,
        CityModule,
        ViaCepModule
    ],
    providers: [
        TutorModalService,
        TutorViewModalService,
        ResponsibleModalService
    ],
    entryComponents: [
        TutorCreatePage,
        TutorViewPage,
        ResponsibleCreatePage
    ]
})
export class TutorModule {
}
