import {PetModel} from '../../../shared/models/pet.model';

export class OpenServicePetSitterModal {
    static readonly type = '[Pets] Open Service Pet Sitter Modal';

    constructor(public payload: PetModel) {
    }
}

export class CloseServicePetSitterModal {
    static readonly type = '[Pets] Close Service Pet Sitter Modal';
}
