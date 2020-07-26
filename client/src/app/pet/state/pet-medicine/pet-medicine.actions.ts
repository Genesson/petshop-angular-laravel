import {PetMedicineModel} from '../../../shared/models/pet-medicine.model';
import {PetModel} from '../../../shared/models/pet.model';

export class SelectPetMedicine {
    static readonly type = '[PetMedicines] Select PetMedicine Success';

    constructor(public payload: PetMedicineModel) {
    }
}

export class LoadPetMedicines {
    static readonly type = '[PetMedicines] Load PetMedicines';

    constructor(public payload: PetModel) {
    }
}

export class LoadPetMedicinesSuccess {
    static readonly type = '[PetMedicines] Load PetMedicines Success';

    constructor(public payload: PetMedicineModel[]) {
    }
}

export class LoadPetMedicinesFail {
    static readonly type = '[PetMedicines] Load PetMedicines Fail';

    constructor(public payload: any) {
    }
}

export class CreatePetMedicine {
    static readonly type = '[PetMedicines] Create PetMedicine';

    constructor(public payload: PetMedicineModel) {
    }
}

export class CreatePetMedicineSuccess {
    static readonly type = '[PetMedicines] Create PetMedicine Success';

    constructor(public payload: PetMedicineModel) {
    }
}

export class CreatePetMedicineFail {
    static readonly type = '[PetMedicines] Create PetMedicine Fail';

    constructor(public payload: any) {
    }
}

export class UpdatePetMedicine {
    static readonly type = '[PetMedicines] Update PetMedicine';

    constructor(public payload: PetMedicineModel) {
    }
}

export class UpdatePetMedicineSuccess {
    static readonly type = '[PetMedicines] Update PetMedicine Success';

    constructor(public payload: PetMedicineModel) {
    }
}

export class UpdatePetMedicineFail {
    static readonly type = '[PetMedicines] Update PetMedicine Fail';

    constructor(public payload: any) {
    }
}

export class DeletePetMedicine {
    static readonly type = '[PetMedicines] Delete PetMedicine';

    constructor(public payload: PetMedicineModel) {
    }
}

export class DeletePetMedicineSuccess {
    static readonly type = '[PetMedicines] Delete PetMedicine Success';

    constructor(public payload: PetMedicineModel) {
    }
}

export class DeletePetMedicineFail {
    static readonly type = '[PetMedicines] Delete PetMedicine Fail';

    constructor(public payload: any) {
    }
}
