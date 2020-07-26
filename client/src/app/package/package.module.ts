import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {BrMaskerModule} from 'br-mask';

import {NgxsModule} from '@ngxs/store';
import {PackageState} from './state/package/package.state';
import {PackageCreateModalState} from './state/package-create-modal/package-create-modal.state';
import {PackagePetModalState} from './state/package-pet-modal/package-pet-modal.state';
import {PackagePetCreateModalState} from './state/package-pet-create-modal/package-pet-create-modal.state';

import {PackageRoutingModule} from './routers/package-routing.module';

import {HeaderModule} from '../shared/components/header/header.module';
import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';
import {FooterButtonModule} from '../shared/components/footer-button/footer-button.module';
import {PetModule} from '../pet/pet.module';

import {PackageCreateModalService} from './services/package-create-modal.service';
import {PackagePetModalService} from './services/package-pet-modal.service';
import {PackagePetCreateModalService} from './services/package-pet-create-modal.service';

import {PackagePage} from './containers/package/package.page';
import {PackageCreatePage} from './components/package-create/package-create.page';
import {PackagePetPage} from './components/package-pet/package-pet.page';
import {PackagePetCreatePage} from './components/package-pet-create/package-pet-create.page';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';

@NgModule({
    declarations: [
        PackagePage,
        PackageCreatePage,
        PackagePetPage,
        PackagePetCreatePage
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgxDatatableModule,
        BrMaskerModule,
        BsDatepickerModule,
        PackageRoutingModule,
        NgxsModule.forFeature([
            PackageState,
            PackageCreateModalState,
            PackagePetModalState,
            PackagePetCreateModalState
        ]),
        HeaderModule,
        FooterButtonModule,
        ValidationMessageModule,
        PetModule
    ],
    providers: [
        PackageCreateModalService,
        PackagePetModalService,
        PackagePetCreateModalService
    ],
    entryComponents: [
        PackageCreatePage,
        PackagePetPage,
        PackagePetCreatePage
    ]
})
export class PackageModule {
}
