import {PackageModel} from '../../../shared/models/package.model';

export class SelectPackage {
    static readonly type = '[Packages] Select Package Success';

    constructor(public payload: PackageModel) {
    }
}

export class LoadPackages {
    static readonly type = '[Packages] Load Packages';
}

export class LoadPackagesSuccess {
    static readonly type = '[Packages] Load Packages Success';

    constructor(public payload: PackageModel[]) {
    }
}

export class LoadPackagesFail {
    static readonly type = '[Packages] Load Packages Fail';

    constructor(public payload: any) {
    }
}

export class CreatePackage {
    static readonly type = '[Packages] Create Package';

    constructor(public payload: PackageModel) {
    }
}

export class CreatePackageSuccess {
    static readonly type = '[Packages] Create Package Success';

    constructor(public payload: PackageModel) {
    }
}

export class CreatePackageFail {
    static readonly type = '[Packages] Create Package Fail';

    constructor(public payload: any) {
    }
}

export class UpdatePackage {
    static readonly type = '[Packages] Update Package';

    constructor(public payload: PackageModel) {
    }
}

export class UpdatePackageSuccess {
    static readonly type = '[Packages] Update Package Success';

    constructor(public payload: PackageModel) {
    }
}

export class UpdatePackageFail {
    static readonly type = '[Packages] Update Package Fail';

    constructor(public payload: any) {
    }
}

export class DeletePackage {
    static readonly type = '[Packages] Delete Package';

    constructor(public payload: PackageModel) {
    }
}

export class DeletePackageSuccess {
    static readonly type = '[Packages] Delete Package Success';

    constructor(public payload: PackageModel) {
    }
}

export class DeletePackageFail {
    static readonly type = '[Packages] Delete Package Fail';

    constructor(public payload: any) {
    }
}
