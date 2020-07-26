import {NfseModel} from '../../../shared/models/nfse.model';

export class SelectNfse {
    static readonly type = '[Nfses] Select Nfse Success';

    constructor(public payload: NfseModel) {}
}

export class LoadNfses {
    static readonly type = '[Nfses] Load Nfses';

    constructor(public payload: number) {}
}

export class LoadNfsesSuccess {
    static readonly type = '[Nfses] Load Nfses Success';

  constructor(public payload: {
    data: {
      data: NfseModel[],
      first_page_url: string,
      prev_page_url: string,
      current_page: number,
      next_page_url: string,
      from: number,
      per_page: number,
      to: number
    } }) {}
}

export class LoadNfsesFail {
    static readonly type = '[Nfses] Load Nfses Fail';

    constructor(public payload: any) {}
}

export class CreateNfse {
    static readonly type = '[Nfses] Create Nfse';

    constructor(public payload: NfseModel) {}
}

export class CreateNfseSuccess {
    static readonly type = '[Nfses] Create Nfse Success';

    constructor(public payload: NfseModel) {}
}

export class CreateNfseFail {
    static readonly type = '[Nfses] Create Nfse Fail';

    constructor(public payload: any) {}
}

export class UpdateNfse {
    static readonly type = '[Nfses] Update Nfse';

    constructor(public payload: NfseModel) {}
}

export class UpdateNfseSuccess {
    static readonly type = '[Nfses] Update Nfse Success';

    constructor(public payload: NfseModel) {}
}

export class UpdateNfseFail {
    static readonly type = '[Nfses] Update Nfse Fail';

    constructor(public payload: any) {}
}

export class DeleteNfse {
    static readonly type = '[Nfses] Delete Nfse';

    constructor(public payload: NfseModel) {}
}

export class DeleteNfseSuccess {
    static readonly type = '[Nfses] Delete Nfse Success';

    constructor(public payload: NfseModel) {}
}

export class DeleteNfseFail {
    static readonly type = '[Nfses] Delete Nfse Fail';

    constructor(public payload: any) {}
}
