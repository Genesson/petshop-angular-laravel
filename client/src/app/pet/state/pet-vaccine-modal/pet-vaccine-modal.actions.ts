import {PetVaccineModel} from '../../../shared/models/pet-vaccine.model';

export class OpenPetVaccineModal {
    static readonly type = '[Units] Open PetVaccine Modal';

    constructor(public payload: { editing: boolean, data?: PetVaccineModel }) {
    }
}

export class ClosePetVaccineModal {
    static readonly type = '[Units] Close PetVaccine Modal';
}

