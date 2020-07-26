import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NgxsModule} from '@ngxs/store';

import {SessionSandbox} from './session.sandbox';
import {SessionState} from './state/session.state';

@NgModule({
    imports: [
        CommonModule,
        NgxsModule.forFeature([SessionState]),
    ],
    providers: [SessionSandbox]
})
export class SessionModule {
}
