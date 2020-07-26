import {PetModel} from '../../../shared/models/pet.model';

export class OpenPetEvaluationModal {
    static readonly type = '[Pets] Open Pet Evaluation Modal';

    constructor(public payload: PetModel) {
    }
}

export class ClosePetEvaluationModal {
    static readonly type = '[Pets] Close Pet Evaluation Modal';
}

