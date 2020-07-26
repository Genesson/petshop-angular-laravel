import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {CardButtonComponent} from './containers/card-button.component';

@NgModule({
    declarations: [
        CardButtonComponent
    ],
    exports: [
        CardButtonComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class CardButtonModule {
}
