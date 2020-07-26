import {Injectable} from '@angular/core';

import {ToastController} from '@ionic/angular';

import {Action, Selector, State, StateContext} from '@ngxs/store';

import {catchError, map} from 'rxjs/operators';

import {NgxsEntityStateAdapter, NgxsEntityStateStateModel} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {
    SelectPermission,
    LoadPermissions,
    LoadPermissionsSuccess,
    LoadPermissionsFail,
    CreatePermission,
    CreatePermissionSuccess,
    CreatePermissionFail,
    UpdatePermission,
    UpdatePermissionSuccess,
    UpdatePermissionFail,
    DeletePermission,
    DeletePermissionSuccess,
    DeletePermissionFail
} from './permission.actions';

import {PermissionModel} from '../../../shared/models/permission.model';

import {PermissionResource} from '../../../shared/resources/permission.resource';
import {ClosePermissionModal} from '../permission-modal/permission-modal.actions';

export class PermissionStateModel extends NgxsEntityStateStateModel<PermissionModel> {
    isLoading: boolean;
}

@State<PermissionStateModel>({
    name: 'permission',
    defaults: {
        ids: [],
        entities: {},
        selected: null,
        isLoading: false
    }
})

@Injectable()
export class PermissionState {

    @Selector()
    static selected(state: PermissionStateModel) {
        return state.entities[state.selected.id];
    }

    @Selector()
    static isLoading(state: PermissionStateModel) {
        return state.isLoading;
    }

    @Selector()
    static entities(state: PermissionStateModel) {
        return state.entities;
    }

    constructor(private permissionResource: PermissionResource,
                private toastController: ToastController) {
    }

    @Action(SelectPermission)
    selectPermission(ctx: StateContext<PermissionStateModel>, {payload}: SelectPermission) {
        NgxsEntityStateAdapter.select(payload, ctx);
    }

    @Action(LoadPermissions)
    loadPermissions(ctx: StateContext<PermissionStateModel>) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.permissionResource.find().pipe(
            map((Permission: PermissionModel[]) => ctx.dispatch(new LoadPermissionsSuccess(Permission))),
            catchError((error) => ctx.dispatch(new LoadPermissionsFail(error)))
        );
    }

    @Action(LoadPermissionsSuccess)
    loadPermissionsSuccess(ctx: StateContext<PermissionStateModel>, {payload}: LoadPermissionsSuccess) {
        NgxsEntityStateAdapter.addAll(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(LoadPermissionsFail)
    loadPermissionsFail(ctx: StateContext<PermissionStateModel>, {payload}: LoadPermissionsFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(CreatePermission)
    createPermission(ctx: StateContext<PermissionStateModel>, action: CreatePermission) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.permissionResource.create(action.payload).pipe(
            map((Permission: PermissionModel) => ctx.dispatch(new CreatePermissionSuccess(Permission))),
            catchError((error) => ctx.dispatch(new CreatePermissionFail(error)))
        );
    }

    @Action(CreatePermissionSuccess)
    createPermissionSuccess(ctx: StateContext<PermissionStateModel>, {payload}: CreatePermissionSuccess) {
        NgxsEntityStateAdapter.addOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Permissão cadastrada com sucesso!');
        ctx.dispatch(new ClosePermissionModal());
    }

    @Action(CreatePermissionFail)
    createPermissionFail(ctx: StateContext<PermissionStateModel>, {payload}: CreatePermissionFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(UpdatePermission)
    updatePermission(ctx: StateContext<PermissionStateModel>, action: UpdatePermission) {
        ctx.patchState({isLoading: true});
        return this.permissionResource.update(action.payload).pipe(
            map((Permission: PermissionModel) => ctx.dispatch(new UpdatePermissionSuccess(Permission))),
            catchError((error) => ctx.dispatch(new UpdatePermissionFail(error)))
        );
    }

    @Action(UpdatePermissionSuccess)
    updatePermissionSuccess(ctx: StateContext<PermissionStateModel>, {payload}: UpdatePermissionSuccess) {
        NgxsEntityStateAdapter.updateOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Permissão atualizada com sucesso!');
        ctx.dispatch(new ClosePermissionModal());
    }

    @Action(UpdatePermissionFail)
    updatePermissionFail(ctx: StateContext<PermissionStateModel>, {payload}: UpdatePermissionFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
    }

    @Action(DeletePermission)
    deletePermission(ctx: StateContext<PermissionStateModel>, action: DeletePermission) {
        NgxsEntityStateAdapter.startLoading(ctx);
        return this.permissionResource.destroy(action.payload).pipe(
            map((Permission: PermissionModel) => ctx.dispatch(new DeletePermissionSuccess(Permission))),
            catchError((error) => ctx.dispatch(new DeletePermissionFail(error)))
        );
    }

    @Action(DeletePermissionSuccess)
    deletePermissionSuccess(ctx: StateContext<PermissionStateModel>, {payload}: DeletePermissionSuccess) {
        NgxsEntityStateAdapter.removeOne(payload, ctx);
        NgxsEntityStateAdapter.stopLoading(ctx);
        this.presentToast('Permissão excluída com sucesso!');
    }

    @Action(DeletePermissionFail)
    deletePermissionFail(ctx: StateContext<PermissionStateModel>, {payload}: DeletePermissionFail) {
        this.presentToast(payload.error.message, 'danger');
        NgxsEntityStateAdapter.stopLoading(ctx);
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
