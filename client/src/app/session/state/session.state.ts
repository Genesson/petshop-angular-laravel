import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Navigate} from '@ngxs/router-plugin';

import {
    UpdateSessionToken,
    Logoff,
    RefreshToken,
    RefreshTokenSuccess,
    RefreshTokenError,
    SelectCategories,
    SelectServiceShower,
    SelectServiceOthers,
    SelectServiceHotel,
    SelectServiceSitter,
    SelectServiceDaycare
} from './session.actions';

import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../../auth/services/auth.service';

import {UserModel} from '../../shared/models/user.model';
import {CategoryModel} from '../../shared/models/category.model';
import {ServiceModel} from '../../shared/models/service.model';

import {LoadReceivablesTotals, LoadReceivables} from '../../cashier/state/receivable/receivable.actions';
import {LoadCashiers} from '../../cashier/state/cashier/cashier.actions';
import {LoadPetVaccines} from '../../pet/state/pet-vaccine/pet-vaccine.actions';

export interface SessionStateModel {
    user: UserModel;
    refreshToken: string;
    accessToken: string;
    categories: CategoryModel[];
    serviceShower: ServiceModel[];
    serviceOthers: ServiceModel[];
    serviceHotel: ServiceModel;
    serviceSitter: ServiceModel;
    serviceDaycare: ServiceModel;
    IdToken: string;
}

@State<SessionStateModel>({
    name: 'session',
    defaults: {
        user: null,
        refreshToken: null,
        accessToken: null,
        categories: null,
        serviceShower: null,
        serviceOthers: null,
        serviceHotel: null,
        serviceSitter: null,
        serviceDaycare: null,
        IdToken: null,
    }
})
export class SessionState {

  constructor(private authService: AuthService, private store: Store) {
  }

    @Selector()
    static userData(state: SessionStateModel) {
        return state.user;
    }

    @Selector()
    static idToken(state: SessionStateModel) {
        return state.IdToken;
    }

    @Selector()
    static refreshToken(state: SessionStateModel) {
        return state.refreshToken;
    }

    @Selector()
    static accessToken(state: SessionStateModel) {
        return state.accessToken;
    }

    @Selector()
    static user(state: SessionStateModel) {
        return (new JwtHelperService()).decodeToken(state.refreshToken);
    }

    @Selector()
    static account(state: SessionStateModel) {
        return (new JwtHelperService()).decodeToken(state.refreshToken)['custom:account'];
    }

    @Selector()
    static categories(state: SessionStateModel) {
        return state.categories;
    }

    @Selector()
    static serviceShower(state: SessionStateModel) {
        return state.serviceShower;
    }

    @Selector()
    static serviceOthers(state: SessionStateModel) {
      return state.serviceOthers;
    }

    @Selector()
    static serviceHotel(state: SessionStateModel) {
        return state.serviceHotel;
    }

    @Selector()
    static serviceSitter(state: SessionStateModel) {
        return state.serviceSitter;
    }

    @Selector()
    static serviceDaycare(state: SessionStateModel) {
        return state.serviceDaycare;
    }

    @Action(UpdateSessionToken)
    updateSessionToken(ctx: StateContext<SessionStateModel>, {payload}: UpdateSessionToken) {
      ctx.patchState(payload);

      // Reload home
      ctx.dispatch(new LoadReceivablesTotals());
      ctx.dispatch(new LoadCashiers());
      ctx.dispatch(new LoadReceivables('NOT_RECEIVED'));
      ctx.dispatch(new LoadPetVaccines());
    }

    @Action(RefreshToken)
    refreshToken(ctx: StateContext<SessionStateModel>) {
      return this.authService.refreshToken(this.store.selectSnapshot(SessionState.refreshToken)).pipe(
        map((sessionToken) => ctx.dispatch(new RefreshTokenSuccess({refreshToken: '', accessToken: '', IdToken: ''}))),
        catchError((error) => ctx.dispatch(new RefreshTokenError(error.message)))
      );
    }

    @Action(RefreshTokenSuccess)
    refreshTokenSuccess(ctx: StateContext<SessionStateModel>, {payload}: RefreshTokenSuccess) {
        ctx.dispatch(new UpdateSessionToken(payload));
    }

    @Action(RefreshTokenError)
    refreshTokenError(ctx: StateContext<SessionStateModel>, {payload}: RefreshTokenError) {
    }

    @Action(Logoff)
    logoff(ctx: StateContext<SessionStateModel>) {
        ctx.dispatch(new Navigate(['auth/login']));
    }

    @Action(SelectCategories)
    selectCategories(ctx: StateContext<SessionStateModel>, {payload}: SelectCategories) {
        ctx.patchState({
            categories: payload
        });
    }

    @Action(SelectServiceShower)
    serviceShower(ctx: StateContext<SessionStateModel>, {payload}: SelectServiceShower) {
        ctx.patchState({
            serviceShower: payload
        });
    }

    @Action(SelectServiceOthers)
    serviceOthers(ctx: StateContext<SessionStateModel>, { payload }: SelectServiceOthers) {
        ctx.patchState({
            serviceOthers: payload
        });
    }

    @Action(SelectServiceHotel)
    selectServiceHotel(ctx: StateContext<SessionStateModel>, {payload}: SelectServiceHotel) {
        ctx.patchState({
            serviceHotel: payload
        });
    }

    @Action(SelectServiceSitter)
    selectServiceSitter(ctx: StateContext<SessionStateModel>, {payload}: SelectServiceSitter) {
        ctx.patchState({
            serviceSitter: payload
        });
    }

    @Action(SelectServiceDaycare)
    selectServiceDaycare(ctx: StateContext<SessionStateModel>, {payload}: SelectServiceDaycare) {
        ctx.patchState({
            serviceDaycare: payload
        });
    }

}
