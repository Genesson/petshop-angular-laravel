import {PetDiseaseModel} from '../../../shared/models/pet-disease.model';

export class OpenPetDiseaseModal {
    static readonly type = '[Units] Open PetDisease Modal';

    constructor(public payload: { editing: boolean, data?: PetDiseaseModel }) {
    }
}

export class ClosePetDiseaseModal {
    static readonly type = '[Units] Close PetDisease Modal';
}

