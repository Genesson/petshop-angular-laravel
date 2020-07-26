import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {ValidationMessageComponent} from './containers/validation-message.component';

@NgModule({
    declarations: [
        ValidationMessageComponent
    ],
    exports: [
        ValidationMessageComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class ValidationMessageModule {
}
