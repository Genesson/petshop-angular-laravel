import {PermissionModel} from '../../../shared/models/permission.model';

export class SelectPermission {
  static readonly type = '[Permissions] Select Permission Success';

  constructor(public payload: PermissionModel) {
  }
}

export class LoadPermissions {
  static readonly type = '[Permissions] Load Permissions';
}

export class LoadPermissionsSuccess {
  static readonly type = '[Permissions] Load Permissions Success';

  constructor(public payload: PermissionModel[]) {
  }
}

export class LoadPermissionsFail {
  static readonly type = '[Permissions] Load Permissions Fail';

  constructor(public payload: any) {
  }
}

export class CreatePermission {
  static readonly type = '[Permissions] Create Permission';

  constructor(public payload: PermissionModel) {
  }
}

export class CreatePermissionSuccess {
  static readonly type = '[Permissions] Create Permission Success';

  constructor(public payload: PermissionModel) {
  }
}

export class CreatePermissionFail {
  static readonly type = '[Permissions] Create Permission Fail';

  constructor(public payload: any) {
  }
}

export class UpdatePermission {
  static readonly type = '[Permissions] Update Permission';

  constructor(public payload: PermissionModel) {
  }
}

export class UpdatePermissionSuccess {
  static readonly type = '[Permissions] Update Permission Success';

  constructor(public payload: PermissionModel) {
  }
}

export class UpdatePermissionFail {
  static readonly type = '[Permissions] Update Permission Fail';

  constructor(public payload: any) {
  }
}

export class DeletePermission {
  static readonly type = '[Permissions] Delete Permission';

  constructor(public payload: PermissionModel) {
  }
}

export class DeletePermissionSuccess {
  static readonly type = '[Permissions] Delete Permission Success';

  constructor(public payload: PermissionModel) {
  }
}

export class DeletePermissionFail {
  static readonly type = '[Permissions] Delete Permission Fail';

  constructor(public payload: any) {
  }
}
