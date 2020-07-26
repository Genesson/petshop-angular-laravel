import {TypeFurModel} from '../../../shared/models/type-fur.model';

export class SelectTypeFur {
    static readonly type = '[TypeFurs] Select TypeFur Success';

    constructor(public payload: TypeFurModel) {
    }
}

export class LoadTypeFurs {
    static readonly type = '[TypeFurs] Load TypeFurs';
}

export class LoadTypeFursSuccess {
    static readonly type = '[TypeFurs] Load TypeFurs Success';

    constructor(public payload: TypeFurModel[]) {
    }
}

export class LoadTypeFursFail {
    static readonly type = '[TypeFurs] Load TypeFurs Fail';

    constructor(public payload: string) {
    }
}

export class CreateTypeFur {
    static readonly type = '[TypeFurs] Create TypeFur';

    constructor(public payload: TypeFurModel) {
    }
}

export class CreateTypeFurSuccess {
    static readonly type = '[TypeFurs] Create TypeFur Success';

    constructor(public payload: TypeFurModel) {
    }
}

export class CreateTypeFurFail {
    static readonly type = '[TypeFurs] Create TypeFur Fail';

    constructor(public payload: any) {
    }
}

export class UpdateTypeFur {
    static readonly type = '[TypeFurs] Update TypeFur';

    constructor(public payload: TypeFurModel) {
    }
}

export class UpdateTypeFurSuccess {
    static readonly type = '[TypeFurs] Update TypeFur Success';

    constructor(public payload: TypeFurModel) {
    }
}

export class UpdateTypeFurFail {
    static readonly type = '[TypeFurs] Update TypeFur Fail';

    constructor(public payload: any) {
    }
}

export class DeleteTypeFur {
    static readonly type = '[TypeFurs] Delete TypeFur';

    constructor(public payload: TypeFurModel) {
    }
}

export class DeleteTypeFurSuccess {
    static readonly type = '[TypeFurs] Delete TypeFur Success';

    constructor(public payload: TypeFurModel) {
    }
}

export class DeleteTypeFurFail {
    static readonly type = '[TypeFurs] Delete TypeFur Fail';

    constructor(public payload: any) {
    }
}
