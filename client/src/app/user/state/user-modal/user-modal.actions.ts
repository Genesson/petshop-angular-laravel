import {UserModel} from '../../../shared/models/user.model';

export class OpenUserModal {
    static readonly type = '[Users] Open User Modal';

    constructor(public payload: { editing: boolean, data?: UserModel }) {
    }
}

export class CloseUserModal {
    static readonly type = '[Users] Close User Modal';
}

