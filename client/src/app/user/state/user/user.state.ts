import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectUser,
    LoadUsers,
    LoadUsersSuccess,
    LoadUsersFail,
    CreateUser,
    CreateUserSuccess,
    CreateUserFail,
    UpdateUser,
    UpdateUserSuccess,
    UpdateUserFail,
    UpdateUserUnity,
    UpdateUserUnitySuccess,
    UpdateUserUnityFail,
    DeleteUser,
    DeleteUserSuccess,
    DeleteUserFail,
    UploadImageUser,
    UploadImageUserSuccess,
    UploadImageUserFail,
    ResetImageUser
} from './user.actions';
import {CloseUserModal} from '../user-modal/user-modal.actions';
import {Refresh} from '../../../auth/state/signin/signin.actions';

import {UserModel} from '../../../shared/models/user.model';

import {UserResource} from '../../../shared/resources/user.resource';
import {UnityModel} from '../../../shared/models/unity.model';

export class UserStateModel extends NgxsEntityStateStateModel<UserModel> {
    image: string;
    isLoadingImage: boolean;
    isLoading: boolean;
    isLoadingUnity: boolean;
}

@State<UserStateModel>({
    name: 'user',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        image: null,
        isLoadingImage: false,
        isLoading: false,
        isLoadingUnity: false
    }
})

@Injectable()
export class UserState {

    @Selector()
    static selected(state: UserStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: UserStateModel) {
        return state.isLoading;
    }

    @Selector()
    static isLoadingUnity(state: UserStateModel) {
        return state.isLoadingUnity;
    }

    @Selector()
    static isLoadingImage(state: UserStateModel) {
        return state.isLoadingImage;
    }

    @Selector()
    static entities(state: UserStateModel) {
        return state.entities;
    }

    @Selector()
    static image(state: UserStateModel) {
        return state.image;
    }

    constructor(private userResource: UserResource,
                private toastController: ToastController) {
    }

    @Action(SelectUser)
    selectUser(ctx: StateContext<UserStateModel>, {payload}: SelectUser) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadUsers)
    loadUsers(ctx: StateContext<UserStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.userResource.findPerAdmin().pipe(
            map((User: UserModel[]) => ctx.dispatch(new LoadUsersSuccess(User))),
            catchError((error) => ctx.dispatch(new LoadUsersFail(error)))
        );
    }

    @Action(LoadUsersSuccess)
    loadUsersSuccess(ctx: StateContext<UserStateModel>, {payload}: LoadUsersSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadUsersFail)
    loadUsersFail(ctx: StateContext<UserStateModel>, {payload}: LoadUsersFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreateUser)
    createUser(ctx: StateContext<UserStateModel>, action: CreateUser) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.userResource.create(action.payload).pipe(
            map((User: UserModel) => ctx.dispatch(new CreateUserSuccess(User))),
            catchError((error) => ctx.dispatch(new CreateUserFail(error)))
        );
    }

    @Action(CreateUserSuccess)
    createUserSuccess(ctx: StateContext<UserStateModel>, {payload}: CreateUserSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Usuário cadastrado com sucesso!');
        ctx.dispatch(new CloseUserModal());
    }

    @Action(CreateUserFail)
    createUserFail(ctx: StateContext<UserStateModel>, {payload}: CreateUserFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateUser)
    updateUser(ctx: StateContext<UserStateModel>, action: UpdateUser) {
        ctx.patchState({isLoading: true});
        return this.userResource.update(action.payload).pipe(
            map((User: UserModel) => ctx.dispatch(new UpdateUserSuccess(User))),
            catchError((error) => ctx.dispatch(new UpdateUserFail(error)))
        );
    }

    @Action(UpdateUserSuccess)
    updateUserSuccess(ctx: StateContext<UserStateModel>, {payload}: UpdateUserSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Usuário atualizado com sucesso!');
        ctx.dispatch(new CloseUserModal());
    }

    @Action(UpdateUserFail)
    updateUserFail(ctx: StateContext<UserStateModel>, {payload}: UpdateUserFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdateUserUnity)
    updateUserUnity(ctx: StateContext<UserStateModel>, action: UpdateUserUnity) {
      ctx.patchState({ isLoadingUnity: true});
      return this.userResource.updateUnity(action.payload).pipe(
          map((Unity: UnityModel) => ctx.dispatch(new UpdateUserUnitySuccess(Unity))),
          catchError((error) => ctx.dispatch(new UpdateUserUnityFail(error)))
      );
    }

    @Action(UpdateUserUnitySuccess)
    updateUserUnitySuccess(ctx: StateContext<UserStateModel>, {payload}: UpdateUserUnitySuccess) {
        ctx.patchState({ isLoadingUnity: false});
        ctx.dispatch(new Refresh());
        this.presentToast('Unidate alterada com sucesso!');
    }

    @Action(UpdateUserUnityFail)
    updateUserUnityFail(ctx: StateContext<UserStateModel>, {payload}: UpdateUserUnityFail) {
        this.presentToast(payload.error.message, 'danger');
        ctx.patchState({ isLoadingUnity: false});
    }

    @Action(DeleteUser)
    deleteUser(ctx: StateContext<UserStateModel>, action: DeleteUser) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.userResource.destroy(action.payload).pipe(
            map((User: UserModel) => ctx.dispatch(new DeleteUserSuccess(User))),
            catchError((error) => ctx.dispatch(new DeleteUserFail(error)))
        );
    }

    @Action(DeleteUserSuccess)
    deleteUserSuccess(ctx: StateContext<UserStateModel>, {payload}: DeleteUserSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Usuário excluído com sucesso!');
    }

    @Action(DeleteUserFail)
    deleteUserFail(ctx: StateContext<UserStateModel>, {payload}: DeleteUserFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UploadImageUser)
    uploadImageUser(ctx: StateContext<UserStateModel>, action: UploadImageUser) {
        ctx.patchState({isLoadingImage: true});
        return this.userResource.uploadImage(action.payload).pipe(
            map((image: any) => ctx.dispatch(new UploadImageUserSuccess(image))),
            catchError((error) => ctx.dispatch(new UploadImageUserFail(error)))
        );
    }

    @Action(UploadImageUserSuccess)
    uploadImageUserSuccess(ctx: StateContext<UserStateModel>, {payload}: UploadImageUserSuccess) {
        ctx.patchState({image: payload});
        ctx.patchState({isLoadingImage: false});
    }

    @Action(UploadImageUserFail)
    uploadImageUserFail(ctx: StateContext<UserStateModel>, {payload}: UploadImageUserFail) {
        this.presentToast(payload.error.message, 'danger');
        ctx.patchState({isLoadingImage: false});
    }

    @Action(ResetImageUser)
    resetImageUser(ctx: StateContext<UserStateModel>) {
        ctx.patchState({image: null});
    }

    async presentToast(msg, type: string = 'success') {
        const toast = await this.toastController.create({
            message: msg,
            duration: 2000,
            color: type
        });
        toast.present();
    }
}
