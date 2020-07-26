import {SizeModel} from '../../../shared/models/size.model';

export class OpenSizeModal {
    static readonly type = '[Sizes] Open Size Modal';

    constructor(public payload: { editing: boolean, data?: SizeModel }) {
    }
}

export class CloseSizeModal {
    static readonly type = '[Sizes] Close Size Modal';
}

