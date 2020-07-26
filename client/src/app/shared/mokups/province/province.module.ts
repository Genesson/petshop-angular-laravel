import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxsModule} from '@ngxs/store';

import {ProvinceState} from './state/province.state';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgxsModule.forFeature([
            ProvinceState
        ])
    ]
})
export class ProvinceModule {
}
