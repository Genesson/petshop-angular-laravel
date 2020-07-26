import {DreModel} from '../../../shared/models/dre.model';

export class SelectDre {
    static readonly type = '[Dres] Select Dre Success';

    constructor(public payload: DreModel) {
    }
}

export class LoadPdf {
    static readonly type = '[Dres] Load Pdf';

    constructor(public payload: string) {
    }
}

export class LoadPdfSuccess {
    static readonly type = '[Dres] Load Pdf Success';

    constructor(public payload: string) {
    }
}

export class LoadPdfFail {
    static readonly type = '[Dres] Load Pdf Fail';

    constructor(public payload: any) {
    }
}

export class LoadDres {
    static readonly type = '[Dres] Load Dres';

    constructor(public payload: string) {
    }
}

export class LoadDresSuccess {
    static readonly type = '[Dres] Load Dres Success';

    constructor(public payload: DreModel) {
    }
}

export class LoadDresFail {
    static readonly type = '[Dres] Load Dres Fail';

    constructor(public payload: any) {
    }
}

export class CreateDre {
    static readonly type = '[Dres] Create Dre';

    constructor(public payload: DreModel) {
    }
}

export class CreateDreSuccess {
    static readonly type = '[Dres] Create Dre Success';

    constructor(public payload: DreModel) {
    }
}

export class CreateDreFail {
    static readonly type = '[Dres] Create Dre Fail';

    constructor(public payload: any) {
    }
}

export class UpdateDre {
    static readonly type = '[Dres] Update Dre';

    constructor(public payload: DreModel) {
    }
}

export class UpdateDreSuccess {
    static readonly type = '[Dres] Update Dre Success';

    constructor(public payload: DreModel) {
    }
}

export class UpdateDreFail {
    static readonly type = '[Dres] Update Dre Fail';

    constructor(public payload: any) {
    }
}

export class DeleteDre {
    static readonly type = '[Dres] Delete Dre';

    constructor(public payload: DreModel) {
    }
}

export class DeleteDreSuccess {
    static readonly type = '[Dres] Delete Dre Success';

    constructor(public payload: DreModel) {
    }
}

export class DeleteDreFail {
    static readonly type = '[Dres] Delete Dre Fail';

    constructor(public payload: any) {
    }
}
