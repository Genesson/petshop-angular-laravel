import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';

import {NgxsModule} from '@ngxs/store';

import {VeterinaryCreateModalState} from './state/veterinary-create-modal/veterinary-create-modal.state';
import {VeterinaryViewModalState} from './state/veterinary-view-modal/veterinary-view-modal.state';
import {VeterinaryPetModalState} from './state/veterinary-pet-modal/veterinary-pet-modal.state';
import {ConsultationState} from './state/consultation/consultation.state';

import {VeterinaryRoutingModule} from './routers/veterinary-routing.module';

import {PetModule} from '../pet/pet.module';
import {PipesModule} from '../shared/pipes/pipes.module';
import {HeaderModule} from '../shared/components/header/header.module';
import {FooterButtonModule} from '../shared/components/footer-button/footer-button.module';
import {FooterModalModule} from '../shared/components/footer-modal/footer-modal.module';
import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';

import {VeterinaryCreateModalService} from './services/veterinary-create-modal.service';
import {VeterinaryViewModalService} from './services/veterinary-view-modal.service';
import {VeterinaryPetModalService} from './services/veterinary-pet-modal.service';

import {VeterinaryPage} from './containers/veterinary/veterinary.page';
import {VeterinaryCreatePage} from './containers/veterinary-create/veterinary-create.page';
import {VeterinaryViewPage} from './containers/veterinary-view/veterinary-view.page';
import {VeterinaryPetPage} from './containers/veterinary-pet/veterinary-pet.page';
import {BrMaskerModule} from 'br-mask';

@NgModule({
    declarations: [
        VeterinaryPage,
        VeterinaryCreatePage,
        VeterinaryViewPage,
        VeterinaryPetPage
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        NgxDatatableModule,
        VeterinaryRoutingModule,
        PetModule,
        PipesModule,
        NgxsModule.forFeature([
            VeterinaryCreateModalState,
            VeterinaryViewModalState,
            VeterinaryPetModalState,
            ConsultationState
        ]),
        HeaderModule,
        FooterButtonModule,
        FooterModalModule,
        ValidationMessageModule,
        BrMaskerModule
    ],
    providers: [
        VeterinaryCreateModalService,
        VeterinaryViewModalService,
        VeterinaryPetModalService
    ],
    entryComponents: [
        VeterinaryCreatePage,
        VeterinaryViewPage,
        VeterinaryPetPage
    ]
})
export class VeterinaryModule {
}
