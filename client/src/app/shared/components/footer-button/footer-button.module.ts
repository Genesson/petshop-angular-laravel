import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {FooterButtonComponent} from './containers/footer-button.component';

@NgModule({
    declarations: [
        FooterButtonComponent
    ],
    exports: [
        FooterButtonComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class FooterButtonModule {
}
