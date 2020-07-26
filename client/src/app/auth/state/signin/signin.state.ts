import {Navigate} from '@ngxs/router-plugin';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {catchError, map} from 'rxjs/operators';

import {
    Signin,
    SigninError,
    SigninSuccess,
    Refresh,
    RefreshSuccess,
    RefreshError,
    RefreshUpdate,
    RefreshUpdateSuccess,
    RefreshUpdateError,
    Logout
} from './signin.actions';
import {UpdateSessionToken} from '../../../session/state/session.actions';
import {SessionState} from '../../../session/state/session.state';

import {AlertService} from '../../../shared/components/alert/services/alert.service';
import {AuthService} from '../../services/auth.service';

export interface SigninStateModel {
    loading: boolean;
}

@State<SigninStateModel>({
    name: 'signin',
    defaults: {
        loading: false
    }
})
export class SigninState {

    @Selector()
    static loading(state: SigninStateModel) {
        return state.loading;
    }

    constructor(private authService: AuthService,
                private alertService: AlertService,
                private store: Store) {
    }

    @Action(Signin)
    signin(ctx: StateContext<SigninStateModel>, {payload}: Signin) {
        ctx.patchState({loading: true});
        return this.authService.signin(payload).pipe(
            map((data) => ctx.dispatch(new SigninSuccess(data))),
            catchError((error) => ctx.dispatch(new SigninError(error.message)))
        );
    }

    @Action(SigninSuccess)
    signinSuccess(ctx: StateContext<SigninStateModel>, {payload}: SigninSuccess) {
        ctx.dispatch(new Navigate(['/main']));
        ctx.dispatch(new UpdateSessionToken(payload));
        ctx.patchState({loading: false});
    }

    @Action(SigninError)
    async signinError(ctx: StateContext<SigninStateModel>, {payload}: SigninError) {
      ctx.patchState({loading: false});
      if ((payload.indexOf("500 OK") !== -1)) {
        this.alertService.presentAlert('Erro', 'Unidade desativada, entre em contato com o suporte!', 'danger', 4000);
      } else {
        this.alertService.presentAlert('Erro', 'Usuário ou Senha Incorreto!', 'danger', 2000);
      }
    }

    @Action(Refresh)
    refresh(ctx: StateContext<SigninStateModel>) {
      ctx.patchState({loading: true});
      return this.authService.refreshToken(this.store.selectSnapshot(SessionState.refreshToken)).pipe(
        map((data) => ctx.dispatch(new RefreshSuccess(data))),
        catchError((error) => ctx.dispatch(new RefreshError(error.message)))
      );
    }

    @Action(RefreshSuccess)
    refreshSuccess(ctx: StateContext<SigninStateModel>, {payload}: RefreshSuccess) {
      ctx.dispatch(new Navigate(['/main/home']));
      ctx.dispatch(new UpdateSessionToken(payload));
      ctx.patchState({loading: false});
    }

    @Action(RefreshError)
    async refreshError(ctx: StateContext<SigninStateModel>, {payload}: RefreshError) {
        ctx.patchState({loading: false});
        this.alertService.presentAlert('Erro', payload, 'danger', 2000);
    }

    @Action(RefreshUpdate)
    refreshUpdate(ctx: StateContext<SigninStateModel>) {
      return this.authService.refreshToken(this.store.selectSnapshot(SessionState.refreshToken)).pipe(
        map((data) => ctx.dispatch(new RefreshUpdateSuccess(data))),
        catchError((error) => ctx.dispatch(new RefreshUpdateError(error.message)))
      );
    }

    @Action(RefreshUpdateSuccess)
    refreshUpdateSuccess(ctx: StateContext<SigninStateModel>, { payload }: RefreshUpdateSuccess) {
      ctx.dispatch(new UpdateSessionToken(payload));
    }

    @Action(RefreshUpdateError)
    async refreshUpdateError(ctx: StateContext<SigninStateModel>, { payload }: RefreshUpdateError) {
      this.alertService.presentAlert('Erro', payload, 'danger', 2000);
    }

    @Action(Logout)
    logout(ctx: StateContext<Logout>) {
        return this.authService.logout();
    }

}
