import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {BrMaskerModule} from 'br-mask';

import {NgxsModule} from '@ngxs/store';

import {PetRoutingModule} from './routers/pet-routing.module';

import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';
import {HeaderModule} from '../shared/components/header/header.module';
import {FooterModalModule} from '../shared/components/footer-modal/footer-modal.module';
import {HeaderModalModule} from '../shared/components/header-modal/header-modal.module';
import {FooterButtonModule} from '../shared/components/footer-button/footer-button.module';
import {CardPetModule} from '../shared/components/card-pet/card-pet.module';
import {CardButtonModule} from '../shared/components/card-button/card-button.module';
import {FileModule} from '../shared/components/file/file.module';
import {SettingModule} from '../setting/setting.module';
import {PipesModule} from '../shared/pipes/pipes.module';

import {PetState} from './state/pet/pet.state';
import {ModuleHotelState} from './state/module-hotel/module-hotel.state';
import {PetEvaluationState} from './state/pet-evaluation/pet-evaluation.state';
import {PetPackageState} from './state/pet-package/pet-package.state';
import {PetDiseaseState} from './state/pet-disease/pet-disease.state';
import {PetMedicineState} from './state/pet-medicine/pet-medicine.state';
import {PetVaccineState} from './state/pet-vaccine/pet-vaccine.state';
import {ModuleHotelModalState} from './state/module-hotel-modal/module-hotel-modal.state';
import {PetScheduleModalState} from './state/pet-schedule-modal/pet-schedule-modal.state';
import {PetModalState} from './state/pet-modal/pet-modal.state';
import {PetServiceModalState} from './state/pet-service-modal/pet-service-modal.state';
import {PetProfileModalState} from './state/pet-profile-modal/pet-profile-modal.state';
import {PetEvaluationModalState} from './state/pet-evaluation-modal/pet-evaluation-modal.state';
import {PetEvaluationInfoInfoModalState} from './state/pet-evaluation-info-modal/pet-evaluation-info-modal.state';
import {ServicePetSitterModalState} from './state/service-pet-sitter-modal/service-pet-sitter-modal.state';
import {PetSpaModalState} from './state/pet-spa-modal/pet-spa-modal.state';
import {PetOtherModalState} from './state/pet-other-modal/pet-other-modal.state';
import {PetCartModalState} from './state/pet-cart-modal/pet-cart-modal.state';
import {DaycareCreateModalState} from './state/daycare-create-modal/daycare-create-modal.state';
import {PetDiseaseModalState} from './state/pet-disease-modal/pet-disease-modal.state';
import {PetMedicineModalState} from './state/pet-medicine-modal/pet-medicine-modal.state';
import {PetVaccineModalState} from './state/pet-vaccine-modal/pet-vaccine-modal.state';

import {PetModalService} from './services/pet-modal.service';
import {PetProfileModalService} from './services/pet-profile-modal.service';
import {PetEvaluationModalService} from './services/pet-evaluation-modal.service';
import {PetEvaluationInfoModalService} from './services/pet-evaluation-info-modal.service';
import {ModuleHotelModalService} from './services/module-hotel-modal.service';
import {PetServiceModalService} from './services/pet-service-modal.service';
import {PetSitterModalService} from './services/pet-sitter-modal.service';
import {PetSpaModalService} from './services/pet-spa-modal.service';
import {PetOtherModalService} from './services/pet-other-modal.service';
import {PetScheduleModalService} from './services/pet-schedule-modal.service';
import {PetCartModalService} from './services/pet-cart-modal.service';
import {DaycareCreateModalService} from './services/daycare-create-modal.service';
import {PetDiseaseModalService} from './services/pet-disease-modal.service';
import {PetMedicineModalService} from './services/pet-medicine-modal.service';
import {PetVaccineModalService} from './services/pet-vaccine-modal.service';

import {PetPage} from './containers/pet/pet.page';
import {PetCreatePage} from './containers/pet-create/pet-create.page';
import {PetServicePage} from './containers/pet-service/pet-service.page';
import {PetProfilePage} from './containers/pet-profile/pet-profile.page';
import {PetEvaluationPage} from './containers/pet-evaluation/pet-evaluation.page';
import {PetEvaluationInfoPage} from './containers/pet-evaluation-info/pet-evaluation-info.page';
import {ModuleHotelPage} from './containers/module-hotel/module-hotel.page';
import {PetSitterPage} from './containers/pet-sitter/pet-sitter.page';
import {PetSpaPage} from './containers/pet-spa/pet-spa.page';
import {PetOthersPage} from './containers/pet-others/pet-others.page';
import {ScheduleCreatePage} from './components/schedule-create/schedule-create.page';
import {PetCartModalPage} from './components/pet-cart-modal/pet-cart-modal.page';
import {DaycareCreatePage} from './components/daycare-create/daycare-create.page';
import {TotalDaysHotelPage} from './components/total-days-hotel/total-days-hotel.page';
import {PetPackagePage} from './components/pet-package/pet-package.page';
import {PackageDatePage} from './components/package-date/package-date.page';
import {PetCartPage} from './components/pet-cart/pet-cart.page';
import {PetDiseaseCreatePage} from './components/pet-disease-create/pet-disease-create.page';
import {PetMedicineCreatePage} from './components/pet-medicine-create/pet-medicine-create.page';
import {PetVaccineCreatePage} from './components/pet-vaccine-create/pet-vaccine-create.page';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';

@NgModule({
    declarations: [
        PetPage,
        PetCreatePage,
        PetServicePage,
        PetProfilePage,
        PetEvaluationPage,
        PetEvaluationInfoPage,
        ModuleHotelPage,
        PetSitterPage,
        PetSpaPage,
        PetOthersPage,
        ScheduleCreatePage,
        PetCartModalPage,
        DaycareCreatePage,
        TotalDaysHotelPage,
        PetPackagePage,
        PackageDatePage,
        PetCartPage,
        PetDiseaseCreatePage,
        PetMedicineCreatePage,
        PetVaccineCreatePage
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgxDatatableModule,
        PetRoutingModule,
        BrMaskerModule,
        BsDatepickerModule,
        TimepickerModule,
        NgxsModule.forFeature([
            PetState,
            ModuleHotelState,
            PetEvaluationState,
            PetPackageState,
            PetDiseaseState,
            PetMedicineState,
            PetVaccineState,
            ModuleHotelModalState,
            PetModalState,
            PetServiceModalState,
            PetProfileModalState,
            PetEvaluationModalState,
            PetEvaluationInfoInfoModalState,
            ServicePetSitterModalState,
            PetSpaModalState,
            PetOtherModalState,
            PetScheduleModalState,
            PetCartModalState,
            DaycareCreateModalState,
            PetDiseaseModalState,
            PetMedicineModalState,
            PetVaccineModalState
        ]),
        ValidationMessageModule,
        HeaderModule,
        FooterButtonModule,
        HeaderModalModule,
        FooterModalModule,
        CardPetModule,
        CardButtonModule,
        FileModule,
        SettingModule,
        PipesModule
    ],
    providers: [
        PetModalService,
        PetProfileModalService,
        PetEvaluationModalService,
        PetEvaluationInfoModalService,
        ModuleHotelModalService,
        PetServiceModalService,
        PetSpaModalService,
        PetOtherModalService,
        PetScheduleModalService,
        PetSitterModalService,
        PetCartModalService,
        DaycareCreateModalService,
        PetDiseaseModalService,
        PetMedicineModalService,
        PetVaccineModalService
    ],
    exports: [
        PetCartPage,
        PetPackagePage,
        PackageDatePage
    ],
    entryComponents: [
        PetCreatePage,
        PetServicePage,
        PetProfilePage,
        PetEvaluationPage,
        PetEvaluationInfoPage,
        ModuleHotelPage,
        PetSitterPage,
        PetSpaPage,
        PetOthersPage,
        ScheduleCreatePage,
        PetCartModalPage,
        DaycareCreatePage,
        PetPackagePage,
        PetDiseaseCreatePage,
        PetMedicineCreatePage,
        PetVaccineCreatePage
    ]
})
export class PetModule {
}
