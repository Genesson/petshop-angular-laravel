import {EvaluationModel} from '../../../shared/models/evaluation.model';

export class OpenPetEvaluationInfoModal {
    static readonly type = '[Pets] Open Pet EvaluationInfo Modal';

    constructor(public payload: EvaluationModel) {
    }
}

export class ClosePetEvaluationInfoModal {
    static readonly type = '[Pets] Close Pet EvaluationInfo Modal';
}

