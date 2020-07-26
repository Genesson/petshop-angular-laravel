import {PetModel} from '../../../shared/models/pet.model';

export class OpenPetServiceModal {
    static readonly type = '[Pets] Open Pet Service Modal';

    constructor(public payload: PetModel) {
    }
}

export class ClosePetServiceModal {
    static readonly type = '[Pets] Close Pet Service Modal';
}

