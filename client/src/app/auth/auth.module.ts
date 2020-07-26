import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {NgxsModule} from '@ngxs/store';

import {SigninState} from './state/signin/signin.state';

import {AlertModule} from '../shared/components/alert/alert.module';

import {AuthRoutingModule} from './routers/auth-routing.module';
import {ValidationMessageModule} from '../shared/components/validation-message/validation-message.module';

import {LoginPage} from './containers/login/login.page';
import {AuthButtonComponent} from './components/auth-button/auth-button.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        AlertModule,
        AuthRoutingModule,
        ValidationMessageModule,
        NgxsModule.forFeature([
            SigninState
        ])
    ],
    declarations: [
        LoginPage,
        AuthButtonComponent
    ]
})
export class AuthModule {
}
