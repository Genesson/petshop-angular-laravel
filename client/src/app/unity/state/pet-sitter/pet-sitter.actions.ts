import {ServiceModel} from '../../../shared/models/service.model';
import {UnityModel} from '../../../shared/models/unity.model';

export class SelectPetSitter {
    static readonly type = '[PetSitters] Select PetSitter';

    constructor(public payload: ServiceModel) {
    }
}

export class LoadPetSitters {
    static readonly type = '[PetSitters] Load PetSitters';
}

export class LoadPetSittersSuccess {
    static readonly type = '[PetSitters] Load PetSitters Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadPetSittersFail {
    static readonly type = '[PetSitters] Load PetSitters Fail';

    constructor(public payload: any) {
    }
}

export class LoadPetSittersUnity {
    static readonly type = '[PetSitters] Load PetSitters Unity';

    constructor(public payload: UnityModel) {
    }
}

export class LoadPetSittersUnitySuccess {
    static readonly type = '[PetSitters] Load PetSitters Unity Success';

    constructor(public payload: ServiceModel[]) {
    }
}

export class LoadPetSittersUnityFail {
    static readonly type = '[PetSitters] Load PetSitters Unity Fail';

    constructor(public payload: any) {
    }
}

export class CreatePetSitter {
    static readonly type = '[PetSitters] Create PetSitter';

    constructor(public payload: ServiceModel) {
    }
}

export class CreatePetSitterSuccess {
    static readonly type = '[PetSitters] Create PetSitter Success';

    constructor(public payload: ServiceModel) {
    }
}

export class CreatePetSitterFail {
    static readonly type = '[PetSitters] Create PetSitter Fail';

    constructor(public payload: any) {
    }
}

export class UpdatePetSitter {
    static readonly type = '[PetSitters] Update PetSitter';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdatePetSitterSuccess {
    static readonly type = '[PetSitters] Update PetSitter Success';

    constructor(public payload: ServiceModel) {
    }
}

export class UpdatePetSitterFail {
    static readonly type = '[PetSitters] Update PetSitter Fail';

    constructor(public payload: any) {
    }
}

export class DeletePetSitter {
    static readonly type = '[PetSitters] Delete PetSitter';

    constructor(public payload: ServiceModel) {
    }
}

export class DeletePetSitterSuccess {
    static readonly type = '[PetSitters] Delete PetSitter Success';

    constructor(public payload: ServiceModel) {
    }
}

export class DeletePetSitterFail {
    static readonly type = '[PetSitters] Delete PetSitter Fail';

    constructor(public payload: any) {
    }
}
