import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {HeaderModalComponent} from './containers/header-modal.component';

@NgModule({
    declarations: [
        HeaderModalComponent
    ],
    exports: [
        HeaderModalComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class HeaderModalModule {
}
