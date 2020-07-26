import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {FileComponent} from './containers/file.component';

@NgModule({
    declarations: [
        FileComponent
    ],
    exports: [
        FileComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class FileModule {
}
