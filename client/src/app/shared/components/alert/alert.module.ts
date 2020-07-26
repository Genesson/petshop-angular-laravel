import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {AlertService} from './services/alert.service';

@NgModule({
    imports: [
        CommonModule,
        IonicModule
    ],
    providers: [
        AlertService
    ]
})
export class AlertModule {
}
