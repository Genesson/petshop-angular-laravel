import {PetDiseaseModel} from '../../../shared/models/pet-disease.model';
import {PetModel} from '../../../shared/models/pet.model';

export class SelectPetDisease {
    static readonly type = '[PetDiseases] Select PetDisease Success';

    constructor(public payload: PetDiseaseModel) {
    }
}

export class LoadPetDiseases {
    static readonly type = '[PetDiseases] Load PetDiseases';

    constructor(public payload: PetModel) {
    }
}

export class LoadPetDiseasesSuccess {
    static readonly type = '[PetDiseases] Load PetDiseases Success';

    constructor(public payload: PetDiseaseModel[]) {
    }
}

export class LoadPetDiseasesFail {
    static readonly type = '[PetDiseases] Load PetDiseases Fail';

    constructor(public payload: any) {
    }
}

export class CreatePetDisease {
    static readonly type = '[PetDiseases] Create PetDisease';

    constructor(public payload: PetDiseaseModel) {
    }
}

export class CreatePetDiseaseSuccess {
    static readonly type = '[PetDiseases] Create PetDisease Success';

    constructor(public payload: PetDiseaseModel) {
    }
}

export class CreatePetDiseaseFail {
    static readonly type = '[PetDiseases] Create PetDisease Fail';

    constructor(public payload: any) {
    }
}

export class UpdatePetDisease {
    static readonly type = '[PetDiseases] Update PetDisease';

    constructor(public payload: PetDiseaseModel) {
    }
}

export class UpdatePetDiseaseSuccess {
    static readonly type = '[PetDiseases] Update PetDisease Success';

    constructor(public payload: PetDiseaseModel) {
    }
}

export class UpdatePetDiseaseFail {
    static readonly type = '[PetDiseases] Update PetDisease Fail';

    constructor(public payload: any) {
    }
}

export class DeletePetDisease {
    static readonly type = '[PetDiseases] Delete PetDisease';

    constructor(public payload: PetDiseaseModel) {
    }
}

export class DeletePetDiseaseSuccess {
    static readonly type = '[PetDiseases] Delete PetDisease Success';

    constructor(public payload: PetDiseaseModel) {
    }
}

export class DeletePetDiseaseFail {
    static readonly type = '[PetDiseases] Delete PetDisease Fail';

    constructor(public payload: any) {
    }
}
