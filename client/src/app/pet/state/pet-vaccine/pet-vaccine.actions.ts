import {PetVaccineModel} from '../../../shared/models/pet-vaccine.model';
import {PetModel} from '../../../shared/models/pet.model';

export class SelectPetVaccine {
    static readonly type = '[PetVaccines] Select PetVaccine Success';

    constructor(public payload: PetVaccineModel) {
    }
}

export class LoadPetVaccines {
    static readonly type = '[PetVaccines] Load PetVaccines';
}

export class LoadPetVaccinesSuccess {
    static readonly type = '[PetVaccines] Load PetVaccines Success';

    constructor(public payload: PetVaccineModel[]) {
    }
}

export class LoadPetVaccinesFail {
    static readonly type = '[PetVaccines] Load PetVaccines Fail';

    constructor(public payload: any) {
    }
}

export class LoadPetVaccinesPet {
    static readonly type = '[PetVaccines] Load PetVaccines Pet';

    constructor(public payload: PetModel) {
    }
}

export class LoadPetVaccinesPetSuccess {
    static readonly type = '[PetVaccines] Load PetVaccines Pet Success';

    constructor(public payload: PetVaccineModel[]) {
    }
}

export class LoadPetVaccinesPetFail {
    static readonly type = '[PetVaccines] Load PetVaccines Pet Fail';

    constructor(public payload: any) {
    }
}

export class CreatePetVaccine {
    static readonly type = '[PetVaccines] Create PetVaccine';

    constructor(public payload: PetVaccineModel) {
    }
}

export class CreatePetVaccineSuccess {
    static readonly type = '[PetVaccines] Create PetVaccine Success';

    constructor(public payload: PetVaccineModel) {
    }
}

export class CreatePetVaccineFail {
    static readonly type = '[PetVaccines] Create PetVaccine Fail';

    constructor(public payload: any) {
    }
}

export class UpdatePetVaccine {
    static readonly type = '[PetVaccines] Update PetVaccine';

    constructor(public payload: PetVaccineModel) {
    }
}

export class UpdatePetVaccineSuccess {
    static readonly type = '[PetVaccines] Update PetVaccine Success';

    constructor(public payload: PetVaccineModel) {
    }
}

export class UpdatePetVaccineFail {
    static readonly type = '[PetVaccines] Update PetVaccine Fail';

    constructor(public payload: any) {
    }
}

export class DeletePetVaccine {
    static readonly type = '[PetVaccines] Delete PetVaccine';

    constructor(public payload: PetVaccineModel) {
    }
}

export class DeletePetVaccineSuccess {
    static readonly type = '[PetVaccines] Delete PetVaccine Success';

    constructor(public payload: PetVaccineModel) {
    }
}

export class DeletePetVaccineFail {
    static readonly type = '[PetVaccines] Delete PetVaccine Fail';

    constructor(public payload: any) {
    }
}
