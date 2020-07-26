import {SizeModel} from '../../../shared/models/size.model';

export class SelectSize {
    static readonly type = '[Sizes] Select Size Success';

    constructor(public payload: SizeModel) {
    }
}

export class LoadSizes {
    static readonly type = '[Sizes] Load Sizes';
}

export class LoadSizesSuccess {
    static readonly type = '[Sizes] Load Sizes Success';

    constructor(public payload: SizeModel[]) {
    }
}

export class LoadSizesFail {
    static readonly type = '[Sizes] Load Sizes Fail';

    constructor(public payload: string) {
    }
}

export class CreateSize {
    static readonly type = '[Sizes] Create Size';

    constructor(public payload: SizeModel) {
    }
}

export class CreateSizeSuccess {
    static readonly type = '[Sizes] Create Size Success';

    constructor(public payload: SizeModel) {
    }
}

export class CreateSizeFail {
    static readonly type = '[Sizes] Create Size Fail';

    constructor(public payload: any) {
    }
}

export class UpdateSize {
    static readonly type = '[Sizes] Update Size';

    constructor(public payload: SizeModel) {
    }
}

export class UpdateSizeSuccess {
    static readonly type = '[Sizes] Update Size Success';

    constructor(public payload: SizeModel) {
    }
}

export class UpdateSizeFail {
    static readonly type = '[Sizes] Update Size Fail';

    constructor(public payload: any) {
    }
}

export class DeleteSize {
    static readonly type = '[Sizes] Delete Size';

    constructor(public payload: SizeModel) {
    }
}

export class DeleteSizeSuccess {
    static readonly type = '[Sizes] Delete Size Success';

    constructor(public payload: SizeModel) {
    }
}

export class DeleteSizeFail {
    static readonly type = '[Sizes] Delete Size Fail';

    constructor(public payload: any) {
    }
}
