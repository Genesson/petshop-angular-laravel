import {PetModel} from '../../../shared/models/pet.model';

export class OpenPetModal {
    static readonly type = '[Pets] Open Pet Modal';

    constructor(public payload: { editing: boolean, data?: PetModel }) {
    }
}

export class ClosePetModal {
    static readonly type = '[Pets] Close Pet Modal';
}

