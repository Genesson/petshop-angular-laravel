import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxsModule} from '@ngxs/store';

import {CityState} from './state/city.state';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        NgxsModule.forFeature([
            CityState
        ])
    ]
})
export class CityModule {
}
