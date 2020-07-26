import {UserModel} from '../../../shared/models/user.model';

export class OpenTutorModal {
    static readonly type = '[Tutors] Open Tutor Modal';

    constructor(public payload: { editing: boolean, data?: UserModel }) {
    }
}

export class CloseTutorModal {
    static readonly type = '[Tutors] Close Tutor Modal';
}

