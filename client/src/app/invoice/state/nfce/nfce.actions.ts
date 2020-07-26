import {NfceModel} from '../../../shared/models/nfce.model';

export class SelectNfce {
    static readonly type = '[Nfces] Select Nfce Success';

    constructor(public payload: NfceModel) {}
}

export class LoadNfces {
    static readonly type = '[Nfces] Load Nfces';

    constructor(public payload: number) {}
}

export class LoadNfcesSuccess {
    static readonly type = '[Nfces] Load Nfces Success';

  constructor(public payload: {
    data: {
      data: NfceModel[],
      first_page_url: string,
      prev_page_url: string,
      current_page: number,
      next_page_url: string,
      from: number,
      per_page: number,
      to: number
    } }) {}
}

export class LoadNfcesFail {
    static readonly type = '[Nfces] Load Nfces Fail';

    constructor(public payload: any) {}
}

export class CreateNfce {
    static readonly type = '[Nfces] Create Nfce';

    constructor(public payload: NfceModel) {}
}

export class CreateNfceSuccess {
    static readonly type = '[Nfces] Create Nfce Success';

    constructor(public payload: NfceModel) {}
}

export class CreateNfceFail {
    static readonly type = '[Nfces] Create Nfce Fail';

    constructor(public payload: any) {}
}

export class UpdateNfce {
    static readonly type = '[Nfces] Update Nfce';

    constructor(public payload: NfceModel) {}
}

export class UpdateNfceSuccess {
    static readonly type = '[Nfces] Update Nfce Success';

    constructor(public payload: NfceModel) {}
}

export class UpdateNfceFail {
    static readonly type = '[Nfces] Update Nfce Fail';

    constructor(public payload: any) {}
}

export class DeleteNfce {
    static readonly type = '[Nfces] Delete Nfce';

    constructor(public payload: NfceModel) {}
}

export class DeleteNfceSuccess {
    static readonly type = '[Nfces] Delete Nfce Success';

    constructor(public payload: NfceModel) {}
}

export class DeleteNfceFail {
    static readonly type = '[Nfces] Delete Nfce Fail';

    constructor(public payload: any) {}
}
