import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {NgxsModule} from '@ngxs/store';

import {ViaCepState} from './state/via-cep/via-cep.state';

@NgModule({
    imports: [
        CommonModule,
        IonicModule,
        NgxsModule.forFeature([
            ViaCepState
        ])
    ]
})
export class ViaCepModule {
}
