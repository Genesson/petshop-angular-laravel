import {ConsultationModel} from '../../../shared/models/consultation.model';
import {PetModel} from '../../../shared/models/pet.model';

export class SelectConsultation {
    static readonly type = '[Consultations] Select Consultation';

    constructor(public payload: ConsultationModel) {
    }
}

export class LoadConsultations {
    static readonly type = '[Consultations] Load Consultations';
}

export class LoadConsultationsSuccess {
    static readonly type = '[Consultations] Load Consultations Success';

    constructor(public payload: ConsultationModel[]) {
    }
}

export class LoadConsultationsFail {
    static readonly type = '[Consultations] Load Consultations Fail';

    constructor(public payload: any) {
    }
}

export class LoadConsultationsPet {
    static readonly type = '[Consultations] Load ConsultationsPet';

    constructor(public payload: PetModel) {
    }
}

export class LoadConsultationsPetSuccess {
    static readonly type = '[Consultations] Load ConsultationsPet Success';

    constructor(public payload: ConsultationModel[]) {
    }
}

export class LoadConsultationsPetFail {
    static readonly type = '[Consultations] Load Consultations Fail';

    constructor(public payload: any) {
    }
}

export class CreateConsultation {
    static readonly type = '[Consultations] Create Consultation';

    constructor(public payload: ConsultationModel) {
    }
}

export class CreateConsultationSuccess {
    static readonly type = '[Consultations] Create Consultation Success';

    constructor(public payload: ConsultationModel) {
    }
}

export class CreateConsultationFail {
    static readonly type = '[Consultations] Create Consultation Fail';

    constructor(public payload: any) {
    }
}

export class UpdateConsultation {
    static readonly type = '[Consultations] Update Consultation';

    constructor(public payload: ConsultationModel) {
    }
}

export class UpdateConsultationSuccess {
    static readonly type = '[Consultations] Update Consultation Success';

    constructor(public payload: ConsultationModel) {
    }
}

export class UpdateConsultationFail {
    static readonly type = '[Consultations] Update Consultation Fail';

    constructor(public payload: any) {
    }
}

export class DeleteConsultation {
    static readonly type = '[Consultations] Delete Consultation';

    constructor(public payload: ConsultationModel) {
    }
}

export class DeleteConsultationSuccess {
    static readonly type = '[Consultations] Delete Consultation Success';

    constructor(public payload: ConsultationModel) {
    }
}

export class DeleteConsultationFail {
    static readonly type = '[Consultations] Delete Consultation Fail';

    constructor(public payload: any) {
    }
}
