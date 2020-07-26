import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxsModule} from '@ngxs/store';

import {BrMaskerModule} from 'br-mask';

import {SettingRoutingModule} from './routers/setting-routing.module';

import {SessionModule} from '../session/session.module';
import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';
import {HeaderModule} from '../shared/components/header/header.module';
import {HeaderModalModule} from '../shared/components/header-modal/header-modal.module';
import {FooterModalModule} from '../shared/components/footer-modal/footer-modal.module';

import {BehaviorState} from './state/behavior/behavior.state';
import {BreedState} from './state/breed/breed.state';
import {SizeState} from './state/size/size.state';
import {TypeFurState} from './state/type-fur/type-fur.state';
import {TypeState} from './state/type/type.state';
import {RoomState} from './state/room/room.state';
import {DistrictState} from './state/district/district.state';
import {RegionState} from './state/region/region.state';
import {CheckState} from './state/check/check.state';
import {PriceVariationState} from './state/price-variation/price-variation.state';
import {ExceptionDateState} from './state/exception-date/exception-date.state';
import {CardFlagsState} from './state/card-flags/card-flags.state';

import {BehaviorModalState} from './state/behavior-modal/behavior-modal.state';
import {BreedModalState} from './state/breed-modal/breed-modal.state';
import {SizeModalState} from './state/size-modal/size-modal.state';
import {TypeFurModalState} from './state/type-fur-modal/type-fur-modal.state';
import {TypeModalState} from './state/type-modal/type-modal.state';
import {RoomModalState} from './state/room-modal/room-modal.state';
import {DistrictModalState} from './state/district-modal/district-modal.state';
import {RegionModalState} from './state/region-modal/region-modal.state';
import {CheckModalState} from './state/check-modal/check-modal.state';
import {PriceVariationModalState} from './state/price-variation-modal/price-variation-modal.state';
import {ExceptionDateModalState} from './state/exception-date-modal/exception-date-modal.state';
import {HolidayState} from './state/holiday/holiday.state';
import {CardFlagModalState} from './state/card-flags-modal/card-flags-modal.state';

import {BehaviorModalService} from './services/behavior-modal.service';
import {BreedModalService} from './services/breed-modal.service';
import {SizeModalService} from './services/size-modal.service';
import {TypeFurModalService} from './services/type-fur-modal.service';
import {TypeModalService} from './services/type-modal.service';
import {DistrictModalService} from './services/district-modal.service';
import {RoomModalService} from './services/room-modal.service';
import {RegionModalService} from './services/region-modal.service';
import {CheckModalService} from './services/check-modal.service';
import {PriceVariationModalService} from './services/price-variation-modal.service';
import {ExceptionDateModalService} from './services/exception-date-modal.service';
import {CardFlagsModalService} from './services/card-flags-modal.service';

import {SettingPage} from './containers/setting/setting.page';
import {BehaviorCreatePage} from './containers/behavior-create/behavior-create.page';
import {BreedCreatePage} from './containers/breed-create/breed-create.page';
import {SizeCreatePage} from './containers/size-create/size-create.page';
import {TypeFurCreatePage} from './containers/type-fur-create/type-fur-create.page';
import {TypeCreatePage} from './containers/type-create/type-create.page';
import {RoomCreatePage} from './containers/room-create/room-create.page';
import {DistrictCreatePage} from './containers/district-create/district-create.page';
import {RegionCreatePage} from './containers/region-create/region-create.page';
import {CheckCreatePage} from './containers/check-create/check-create.page';
import {PriceVariationCreatePage} from './containers/price-variation-create/price-variation-create.page';
import {ExceptionDateCreatePage} from './containers/exception-date-create/exception-date-create.page';
import {CardFlagsCreatePage} from './containers/card-flags-create/card-flags-create.page';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';

@NgModule({
    declarations: [
        SettingPage,
        BehaviorCreatePage,
        BreedCreatePage,
        SizeCreatePage,
        TypeCreatePage,
        TypeFurCreatePage,
        RoomCreatePage,
        DistrictCreatePage,
        RegionCreatePage,
        CheckCreatePage,
        PriceVariationCreatePage,
        ExceptionDateCreatePage,
        CardFlagsCreatePage
    ],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        SettingRoutingModule,
        BrMaskerModule,
        BsDatepickerModule,
        TimepickerModule,
        NgxsModule.forFeature([
            BehaviorState,
            BreedState,
            SizeState,
            TypeFurState,
            TypeState,
            RoomState,
            DistrictState,
            RegionState,
            CheckState,
            PriceVariationState,
            ExceptionDateState,
            CardFlagsState,
            BehaviorModalState,
            BreedModalState,
            SizeModalState,
            TypeFurModalState,
            TypeModalState,
            RoomModalState,
            DistrictModalState,
            RegionModalState,
            CheckModalState,
            PriceVariationModalState,
            ExceptionDateModalState,
            HolidayState,
            CardFlagModalState
        ]),
        SessionModule,
        ValidationMessageModule,
        HeaderModule,
        HeaderModalModule,
        FooterModalModule
    ],
    providers: [
        BehaviorModalService,
        BreedModalService,
        SizeModalService,
        TypeFurModalService,
        TypeModalService,
        RoomModalService,
        DistrictModalService,
        RegionModalService,
        CheckModalService,
        PriceVariationModalService,
        ExceptionDateModalService,
        CardFlagsModalService
    ],
    entryComponents: [
        BehaviorCreatePage,
        BreedCreatePage,
        SizeCreatePage,
        TypeCreatePage,
        TypeFurCreatePage,
        RoomCreatePage,
        DistrictCreatePage,
        RegionCreatePage,
        CheckCreatePage,
        PriceVariationCreatePage,
        ExceptionDateCreatePage,
        CardFlagsCreatePage
    ]
})
export class SettingModule {
}
