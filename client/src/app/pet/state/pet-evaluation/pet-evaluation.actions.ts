import {EvaluationModel} from '../../../shared/models/evaluation.model';
import {PetModel} from '../../../shared/models/pet.model';

export class SelectEvaluation {
    static readonly type = '[Evaluations] Select Evaluation Success';

    constructor(public payload: EvaluationModel) {
    }
}

export class LoadEvaluations {
    static readonly type = '[Evaluations] Load Evaluations';

    constructor(public payload: PetModel) {
    }
}

export class LoadEvaluationsSuccess {
    static readonly type = '[Evaluations] Load Evaluations Success';

    constructor(public payload: EvaluationModel[]) {
    }
}

export class LoadEvaluationsFail {
    static readonly type = '[Evaluations] Load Evaluations Fail';

    constructor(public payload: any) {
    }
}

export class CreateEvaluation {
    static readonly type = '[Evaluations] Create Evaluation';

    constructor(public payload: EvaluationModel) {
    }
}

export class CreateEvaluationSuccess {
    static readonly type = '[Evaluations] Create Evaluation Success';

    constructor(public payload: EvaluationModel) {
    }
}

export class CreateEvaluationFail {
    static readonly type = '[Evaluations] Create Evaluation Fail';

    constructor(public payload: any) {
    }
}

export class UpdateEvaluation {
    static readonly type = '[Evaluations] Update Evaluation';

    constructor(public payload: EvaluationModel) {
    }
}

export class UpdateEvaluationSuccess {
    static readonly type = '[Evaluations] Update Evaluation Success';

    constructor(public payload: EvaluationModel) {
    }
}

export class UpdateEvaluationFail {
    static readonly type = '[Evaluations] Update Evaluation Fail';

    constructor(public payload: any) {
    }
}

export class DeleteEvaluation {
    static readonly type = '[Evaluations] Delete Evaluation';

    constructor(public payload: EvaluationModel) {
    }
}

export class DeleteEvaluationSuccess {
    static readonly type = '[Evaluations] Delete Evaluation Success';

    constructor(public payload: EvaluationModel) {
    }
}

export class DeleteEvaluationFail {
    static readonly type = '[Evaluations] Delete Evaluation Fail';

    constructor(public payload: any) {
    }
}
