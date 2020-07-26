import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HomeRoutingModule} from './routers/home-routing.module';

import {HeaderModule} from '../shared/components/header/header.module';
import {CashierModule} from '../cashier/cashier.module';
import {PetModule} from '../pet/pet.module';

import {HomePage} from './containers/home/home.page';
import {HomeCardComponent} from './components/home-card/home-card.component';
import {HomePdvComponent} from './components/home-pdv/home-pdv.component';
import {HomeRequestsComponent} from './components/home-requests/home-requests.component';
import {HomeNotificationsComponent} from './components/home-notifications/home-notifications.component';

@NgModule({
    declarations: [
        HomePage,
        HomeCardComponent,
        HomePdvComponent,
        HomeRequestsComponent,
        HomeNotificationsComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomeRoutingModule,
        HeaderModule,
        CashierModule,
        PetModule
    ]
})
export class HomeModule {
}
