import {PetPackageModel} from '../../../shared/models/pet-package.model';

export class SelectPetPackage {
    static readonly type = '[PetPackages] Select PetPackage Success';

    constructor(public payload: PetPackageModel) {
    }
}

export class LoadPetPackages {
    static readonly type = '[PetPackages] Load PetPackages';
}

export class LoadPetPackagesSuccess {
    static readonly type = '[PetPackages] Load PetPackages Success';

    constructor(public payload: PetPackageModel[]) {
    }
}

export class LoadPetPackagesFail {
    static readonly type = '[PetPackages] Load PetPackages Fail';

    constructor(public payload: any) {
    }
}

export class CreatePetPackage {
    static readonly type = '[PetPackages] Create PetPackage';

    constructor(public payload: PetPackageModel) {
    }
}

export class CreatePetPackageSuccess {
    static readonly type = '[PetPackages] Create PetPackage Success';

    constructor(public payload: PetPackageModel) {
    }
}

export class CreatePetPackageFail {
    static readonly type = '[PetPackages] Create PetPackage Fail';

    constructor(public payload: any) {
    }
}

export class UpdatePetPackage {
    static readonly type = '[PetPackages] Update PetPackage';

    constructor(public payload: PetPackageModel) {
    }
}

export class UpdatePetPackageSuccess {
    static readonly type = '[PetPackages] Update PetPackage Success';

    constructor(public payload: PetPackageModel) {
    }
}

export class UpdatePetPackageFail {
    static readonly type = '[PetPackages] Update PetPackage Fail';

    constructor(public payload: any) {
    }
}

export class DeletePetPackage {
    static readonly type = '[PetPackages] Delete PetPackage';

    constructor(public payload: PetPackageModel) {
    }
}

export class DeletePetPackageSuccess {
    static readonly type = '[PetPackages] Delete PetPackage Success';

    constructor(public payload: PetPackageModel) {
    }
}

export class DeletePetPackageFail {
    static readonly type = '[PetPackages] Delete PetPackage Fail';

    constructor(public payload: any) {
    }
}

export class DateIntervalsPetPackage {
    static readonly type = '[PetPackages] Date Intervals Pet Package';

    constructor(public payload: any) {
    }
}

export class DateIntervalsPetPackageSuccess {
    static readonly type = '[PetPackages] Date Intervals Pet Package Success';

    constructor(public payload: any) {
    }
}

export class DateIntervalsPetPackageFail {
    static readonly type = '[PetPackages] Date Intervals Pet Package Fail';

    constructor(public payload: any) {
    }
}
