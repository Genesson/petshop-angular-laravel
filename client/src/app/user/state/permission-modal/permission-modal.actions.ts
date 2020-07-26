import {PermissionModel} from '../../../shared/models/permission.model';

export class OpenPermissionModal {
    static readonly type = '[Permissions] Open Permission Modal';

    constructor(public payload: { editing: boolean, data?: PermissionModel }) {
    }
}

export class ClosePermissionModal {
    static readonly type = '[Permissions] Close Permission Modal';
}

