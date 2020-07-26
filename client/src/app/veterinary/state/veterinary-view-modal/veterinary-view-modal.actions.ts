import {ConsultationModel} from '../../../shared/models/consultation.model';

export class OpenVeterinaryViewModal {
    static readonly type = '[Veterinary] Open Veterinary View Modal';

    constructor(public payload: ConsultationModel) {
    }
}

export class CloseVeterinaryViewModal {
    static readonly type = '[Veterinary] Close Veterinary View Modal';
}

