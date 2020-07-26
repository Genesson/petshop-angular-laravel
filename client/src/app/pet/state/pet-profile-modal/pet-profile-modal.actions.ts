import {PetModel} from '../../../shared/models/pet.model';

export class OpenPetProfileModal {
    static readonly type = '[Pets] Open Pet Profile Modal';

    constructor(public payload: PetModel) {
    }
}

export class ClosePetProfileModal {
    static readonly type = '[Pets] Close Pet Profile Modal';
}

