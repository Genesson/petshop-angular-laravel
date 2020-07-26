import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {FooterModalComponent} from './containers/footer-modal.component';

@NgModule({
    declarations: [
        FooterModalComponent
    ],
    exports: [
        FooterModalComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class FooterModalModule {
}
