import {CardFlagModel} from '../../../shared/models/cardFlag.model';

export class SelectCardFlag {
    static readonly type = '[CardFlags] Select CardFlag Success';

    constructor(public payload: CardFlagModel) {
    }
}

export class LoadCardFlags {
    static readonly type = '[CardFlags] Load CardFlags';
}

export class LoadCardFlagsSuccess {
    static readonly type = '[CardFlags] Load CardFlags Success';

    constructor(public payload: CardFlagModel[]) {
    }
}

export class LoadCardFlagsFail {
    static readonly type = '[CardFlags] Load CardFlags Fail';

    constructor(public payload: string) {
    }
}

export class CreateCardFlag {
    static readonly type = '[CardFlags] Create CardFlag';

    constructor(public payload: CardFlagModel) {
    }
}

export class CreateCardFlagSuccess {
    static readonly type = '[CardFlags] Create CardFlag Success';

    constructor(public payload: CardFlagModel) {
    }
}

export class CreateCardFlagFail {
    static readonly type = '[CardFlags] Create CardFlag Fail';

    constructor(public payload: any) {
    }
}

export class UpdateCardFlag {
    static readonly type = '[CardFlags] Update CardFlag';

    constructor(public payload: CardFlagModel) {
    }
}

export class UpdateCardFlagSuccess {
    static readonly type = '[CardFlags] Update CardFlag Success';

    constructor(public payload: CardFlagModel) {
    }
}

export class UpdateCardFlagFail {
    static readonly type = '[CardFlags] Update CardFlag Fail';

    constructor(public payload: any) {
    }
}

export class DeleteCardFlag {
    static readonly type = '[CardFlags] Delete CardFlag';

    constructor(public payload: CardFlagModel) {
    }
}

export class DeleteCardFlagSuccess {
    static readonly type = '[CardFlags] Delete CardFlag Success';

    constructor(public payload: CardFlagModel) {
    }
}

export class DeleteCardFlagFail {
    static readonly type = '[CardFlags] Delete CardFlag Fail';

    constructor(public payload: any) {
    }
}
