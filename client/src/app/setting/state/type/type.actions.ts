import {TypeModel} from '../../../shared/models/type.model';

export class SelectType {
    static readonly type = '[Types] Select Type Success';

    constructor(public payload: TypeModel) {
    }
}

export class LoadTypes {
    static readonly type = '[Types] Load Types';
}

export class LoadTypesSuccess {
    static readonly type = '[Types] Load Types Success';

    constructor(public payload: TypeModel[]) {
    }
}

export class LoadTypesFail {
    static readonly type = '[Types] Load Types Fail';

    constructor(public payload: string) {
    }
}

export class CreateType {
    static readonly type = '[Types] Create Type';

    constructor(public payload: TypeModel) {
    }
}

export class CreateTypeSuccess {
    static readonly type = '[Types] Create Type Success';

    constructor(public payload: TypeModel) {
    }
}

export class CreateTypeFail {
    static readonly type = '[Types] Create Type Fail';

    constructor(public payload: any) {
    }
}

export class UpdateType {
    static readonly type = '[Types] Update Type';

    constructor(public payload: TypeModel) {
    }
}

export class UpdateTypeSuccess {
    static readonly type = '[Types] Update Type Success';

    constructor(public payload: TypeModel) {
    }
}

export class UpdateTypeFail {
    static readonly type = '[Types] Update Type Fail';

    constructor(public payload: any) {
    }
}

export class DeleteType {
    static readonly type = '[Types] Delete Type';

    constructor(public payload: TypeModel) {
    }
}

export class DeleteTypeSuccess {
    static readonly type = '[Types] Delete Type Success';

    constructor(public payload: TypeModel) {
    }
}

export class DeleteTypeFail {
    static readonly type = '[Types] Delete Type Fail';

    constructor(public payload: any) {
    }
}
