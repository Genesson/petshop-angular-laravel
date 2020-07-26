import {UserModel} from '../../../shared/models/user.model';

export class OpenResponsibleModal {
    static readonly type = '[Responsibles] Open Responsible Modal';

    constructor(public payload: UserModel) {
    }
}

export class CloseResponsibleModal {
    static readonly type = '[Responsibles] Close Responsible Modal';
}

