import {PetModel} from '../../../shared/models/pet.model';

export class OpenVeterinaryCreateModal {
    static readonly type = '[Veterinary] Open Veterinary Create Modal';

    constructor(public payload: PetModel) {
    }
}

export class CloseVeterinaryCreateModal {
    static readonly type = '[Veterinary] Close Veterinary Create Modal';
}

