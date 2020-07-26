import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IonicModule} from '@ionic/angular';

import {CardPetComponent} from './containers/card-pet.component';

@NgModule({
    declarations: [
        CardPetComponent
    ],
    exports: [
        CardPetComponent
    ],
    imports: [
        CommonModule,
        IonicModule
    ]
})
export class CardPetModule {
}
