import {UserModel} from '../../../shared/models/user.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectUser {
  static readonly type = '[Users] Select User Success';

  constructor(public payload: UserModel) {
  }
}

export class LoadUsers {
  static readonly type = '[Users] Load Users';
}

export class LoadUsersSuccess {
  static readonly type = '[Users] Load Users Success';

  constructor(public payload: UserModel[]) {
  }
}

export class LoadUsersFail {
  static readonly type = '[Users] Load Users Fail';

  constructor(public payload: any) {
  }
}

export class CreateUser {
  static readonly type = '[Users] Create User';

  constructor(public payload: UserModel) {
  }
}

export class CreateUserSuccess {
  static readonly type = '[Users] Create User Success';

  constructor(public payload: UserModel) {
  }
}

export class CreateUserFail {
  static readonly type = '[Users] Create User Fail';

  constructor(public payload: any) {
  }
}

export class UpdateUser {
  static readonly type = '[Users] Update User';

  constructor(public payload: UserModel) {
  }
}

export class UpdateUserSuccess {
  static readonly type = '[Users] Update User Success';

  constructor(public payload: UserModel) {
  }
}

export class UpdateUserFail {
  static readonly type = '[Users] Update User Fail';

  constructor(public payload: any) {
  }
}

export class UpdateUserUnity {
  static readonly type = '[Users] Update User Unity';

  constructor(public payload: UnityModel) {
  }
}

export class UpdateUserUnitySuccess {
  static readonly type = '[Users] Update User Unity Success';

  constructor(public payload: UnityModel) {
  }
}

export class UpdateUserUnityFail {
  static readonly type = '[Users] Update User Unity Fail';

  constructor(public payload: any) {
  }
}

export class DeleteUser {
  static readonly type = '[Users] Delete User';

  constructor(public payload: UserModel) {
  }
}

export class DeleteUserSuccess {
  static readonly type = '[Users] Delete User Success';

  constructor(public payload: UserModel) {
  }
}

export class DeleteUserFail {
  static readonly type = '[Users] Delete User Fail';

  constructor(public payload: any) {
  }
}

export class UploadImageUser {
  static readonly type = '[Users] Upload Image User';

  constructor(public payload: FormData) {
  }
}

export class UploadImageUserSuccess {
  static readonly type = '[Users] Upload Image User Success';

  constructor(public payload: string) {
  }
}

export class UploadImageUserFail {
  static readonly type = '[Users] Upload Image User Fail';

  constructor(public payload: any) {
  }
}

export class ResetImageUser {
  static readonly type = '[Users] Reset Image User';
}
