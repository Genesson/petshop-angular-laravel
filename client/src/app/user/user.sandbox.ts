import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {UserSelectors} from './state/user/user.selectors';
import {PermissionSelectors} from './state/permission/permission.selectors';

import {
    SelectUser,
    LoadUsers,
    CreateUser,
    UpdateUser,
    DeleteUser,
    UploadImageUser,
    UpdateUserUnity,
    ResetImageUser
} from '../user/state/user/user.actions';
import {
    SelectPermission,
    LoadPermissions,
    CreatePermission,
    UpdatePermission,
    DeletePermission
} from './state/permission/permission.actions';
import {OpenUserModal, CloseUserModal} from '../user/state/user-modal/user-modal.actions';
import {OpenPermissionModal, ClosePermissionModal} from './state/permission-modal/permission-modal.actions';

import {UserModel} from '../shared/models/user.model';
import {UnityModel} from '../shared/models/unity.model';
import {PermissionModel} from '../shared/models/permission.model';

@Injectable({
    providedIn: 'root'
})
export class UserSandbox {

    @Select(UserSelectors.entities) usersCollection$: Observable<UserModel[]>;

    @Select(UserSelectors.entitiesSchedule) usersScheduleCollection$: Observable<UserModel[]>;

    @Select(UserSelectors.selected) userSelected$: Observable<UserModel>;

    @Select(UserSelectors.image) imageUser$: Observable<string>;

    @Select(UserSelectors.isLoading) isLoadingUser$: Observable<boolean>;

    @Select(UserSelectors.isLoadingUnity) isLoadingUnity$: Observable<boolean>;

    @Select(UserSelectors.isLoadingImage) isLoadingImageUser$: Observable<boolean>;

    @Select(PermissionSelectors.entities) permissionsCollection$: Observable<PermissionModel[]>;

    @Select(PermissionSelectors.selected) permissionSelected$: Observable<PermissionModel>;

    @Select(PermissionSelectors.isLoading) isLoadingPermission$: Observable<boolean>;

    constructor(private store: Store) {
    }

    public selectUser(user: UserModel) {
        this.store.dispatch(new SelectUser(user));
    }

    public loadUsers() {
        this.store.dispatch(new LoadUsers());
    }

    public createUser(user: UserModel) {
        this.store.dispatch(new CreateUser(user));
    }

    public updateUser(user: UserModel) {
        this.store.dispatch(new UpdateUser(user));
    }

    public updateUserUnity(unity: UnityModel) {
        this.store.dispatch(new UpdateUserUnity(unity));
    }

    public deleteUser(user: UserModel) {
        this.store.dispatch(new DeleteUser(user));
    }

    public uploadImageUser(image: FormData) {
        this.store.dispatch(new UploadImageUser(image));
    }

    public resetImageUser() {
        this.store.dispatch(new ResetImageUser());
    }

    public selectPermission(permission: PermissionModel) {
        this.store.dispatch(new SelectPermission(permission));
    }

    public loadPermissions() {
        this.store.dispatch(new LoadPermissions());
    }

    public createPermission(permission: PermissionModel) {
        this.store.dispatch(new CreatePermission(permission));
    }

    public updatePermission(permission: PermissionModel) {
        this.store.dispatch(new UpdatePermission(permission));
    }

    public deletePermission(permission: PermissionModel) {
        this.store.dispatch(new DeletePermission(permission));
    }

    public openModal(editing, data?) {
        this.store.dispatch(new OpenUserModal({editing, data}));
    }

    public closeModal() {
        this.store.dispatch(new CloseUserModal());
    }

    public openPermissionModal(editing, data?) {
        this.store.dispatch(new OpenPermissionModal({editing, data}));
    }

    public closePermissionModal() {
        this.store.dispatch(new ClosePermissionModal());
    }

}
