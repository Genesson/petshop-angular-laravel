import {UserModel} from '../../../shared/models/user.model';

export class OpenTutorViewModal {
    static readonly type = '[Tutors] Open Tutor View Modal';

    constructor(public payload: UserModel) {
    }
}

export class CloseTutorViewModal {
    static readonly type = '[Tutors] Close Tutor View Modal';
}

