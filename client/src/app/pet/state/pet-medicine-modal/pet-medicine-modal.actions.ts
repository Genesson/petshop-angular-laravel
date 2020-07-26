import {PetMedicineModel} from '../../../shared/models/pet-medicine.model';

export class OpenPetMedicineModal {
    static readonly type = '[Units] Open PetMedicine Modal';

    constructor(public payload: { editing: boolean, data?: PetMedicineModel }) {
    }
}

export class ClosePetMedicineModal {
    static readonly type = '[Units] Close PetMedicine Modal';
}

