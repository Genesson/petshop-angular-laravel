import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';
import {SelectSnapshot} from '@ngxs-labs/select-snapshot';

import {Observable} from 'rxjs';

import {SessionState} from './state/session.state';

import {UserModel} from '../shared/models/user.model';

@Injectable()
export class SessionSandbox {

    @Select(SessionState.account) account$: Observable<any>;

    @SelectSnapshot(SessionState.idToken) idToken: string;

    @SelectSnapshot(SessionState.accessToken) accessToken: string;

    @SelectSnapshot(SessionState.user) user: UserModel;

    @SelectSnapshot(SessionState.userData) userData: UserModel;

    @SelectSnapshot(SessionState.account) account: string;

    @Select(SessionState.user) user$: Observable<UserModel>;

    @Select(SessionState.userData) userData$: Observable<UserModel>;

    constructor(private store: Store) {
    }
}
