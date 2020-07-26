import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxsModule} from '@ngxs/store';

import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ColorPickerModule} from 'ngx-color-picker';
import {BrMaskerModule} from 'br-mask';
import {NgxPermissionsModule} from 'ngx-permissions';

import {UnityRoutingModule} from './routers/unity-routing.module';

import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';
import {HeaderModule} from '../shared/components/header/header.module';
import {FooterButtonModule} from '../shared/components/footer-button/footer-button.module';
import {HeaderModalModule} from '../shared/components/header-modal/header-modal.module';
import {FooterModalModule} from '../shared/components/footer-modal/footer-modal.module';
import {FileModule} from '../shared/components/file/file.module';
import {ProvinceModule} from '../shared/mokups/province/province.module';
import {CityModule} from '../shared/mokups/city/city.module';

import {UnityModalService} from './services/unity-modal.service';
import {CategoryModalService} from './services/category-modal.service';
import {ServiceModalService} from './services/service-modal.service';
import {ShowerModalService} from './services/shower-modal.service';
import {SubShowerModalService} from './services/sub-shower-modal.service';
import {TransportModalService} from './services/transport-modal.service';
import {PetSitterModalService} from './services/pet-sitter-modal.service';
import {DayCareModalService} from './services/day-care-modal.service';
import {HotelModalService} from './services/hotel-modal.service';
import {OtherModalService} from './services/other-modal.service';

import {UnityState} from './state/unity/unity.state';
import {CategoryState} from './state/category/category.state';
import {ServiceState} from './state/service/service.state';
import {SubServiceState} from './state/sub-service/sub-service.state';
import {ShowerState} from './state/shower/shower.state';
import {SubShowerState} from './state/sub-shower/sub-shower.state';
import {TransportState} from './state/transport/transport.state';
import {PetSitterState} from './state/pet-sitter/pet-sitter.state';
import {DayCareState} from './state/day-care/day-care.state';
import {HotelState} from './state/hotel/hotel.state';
import {OtherState} from './state/other/other.state';

import {UnityModalState} from './state/unity-modal/unity-modal.state';
import {CategoryModalState} from './state/category-modal/category-modal.state';
import {ServiceModalState} from './state/service-modal/service-modal.state';
import {ShowerModalState} from './state/shower-modal/shower-modal.state';
import {SubShowerModalState} from './state/sub-shower-modal/sub-shower-modal.state';
import {TransportModalState} from './state/transport-modal/transport-modal.state';
import {PetSitterModalState} from './state/pet-sitter-modal/pet-sitter-modal.state';
import {DayCareModalState} from './state/day-care-modal/day-care-modal.state';
import {HotelModalState} from './state/hotel-modal/hotel-modal.state';
import {OtherModalState} from './state/other-modal/other-modal.state';

import {UnityPage} from './containers/unity/unity.page';
import {UnityCreatePage} from './containers/unity-create/unity-create.page';
import {CategoryCreatePage} from './containers/category-create/category-create.page';
import {ServiceListPage} from './components/service-list/service-list.page';
import {ServiceCreatePage} from './containers/service-create/service-create.page';
import {ShowerCreatePage} from './components/shower-create/shower-create.page';
import {SubShowerCreatePage} from './components/sub-shower-create/sub-shower-create.page';
import {TransportCreatePage} from './components/transport-create/transport-create.page';
import {PetSitterCreatePage} from './components/pet-sitter-create/pet-sitter-create.page';
import {DayCareCreatePage} from './components/day-care-create/day-care-create.page';
import {HotelCreatePage} from './components/hotel-create/hotel-create.page';
import {OtherCreatePage} from './components/other-create/other-create.page';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';

@NgModule({
    declarations: [
        UnityPage,
        UnityCreatePage,
        CategoryCreatePage,
        ServiceListPage,
        ServiceCreatePage,
        ShowerCreatePage,
        SubShowerCreatePage,
        TransportCreatePage,
        PetSitterCreatePage,
        DayCareCreatePage,
        HotelCreatePage,
        OtherCreatePage
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        UnityRoutingModule,
        NgxsModule.forFeature([
            UnityState,
            CategoryState,
            ServiceState,
            SubServiceState,
            ShowerState,
            SubShowerState,
            TransportState,
            PetSitterState,
            DayCareState,
            HotelState,
            OtherState,
            UnityModalState,
            CategoryModalState,
            ServiceModalState,
            ShowerModalState,
            SubShowerModalState,
            TransportModalState,
            PetSitterModalState,
            DayCareModalState,
            HotelModalState,
            OtherModalState
        ]),
        NgxDatatableModule,
        ColorPickerModule,
        BrMaskerModule,
        TimepickerModule,
        NgxPermissionsModule,
        ValidationMessageModule,
        HeaderModule,
        FooterButtonModule,
        HeaderModalModule,
        FooterModalModule,
        FileModule,
        ProvinceModule,
        CityModule
    ],
    providers: [
        UnityModalService,
        CategoryModalService,
        ServiceModalService,
        ShowerModalService,
        SubShowerModalService,
        TransportModalService,
        PetSitterModalService,
        DayCareModalService,
        HotelModalService,
        OtherModalService
    ],
    entryComponents: [
        UnityCreatePage,
        CategoryCreatePage,
        ServiceCreatePage,
        ShowerCreatePage,
        SubShowerCreatePage,
        TransportCreatePage,
        PetSitterCreatePage,
        DayCareCreatePage,
        HotelCreatePage,
        OtherCreatePage
    ]
})
export class UnityModule {
}
