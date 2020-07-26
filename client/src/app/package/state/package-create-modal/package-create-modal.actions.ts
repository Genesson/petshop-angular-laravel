import {PackageModel} from '../../../shared/models/package.model';

export class OpenPackageCreateModal {
    static readonly type = '[Packages] Open Package Create Modal';

    constructor(public payload: { editing: boolean, data?: PackageModel }) {
    }
}

export class ClosePackageCreateModal {
    static readonly type = '[Packages] Close Package Create Modal';
}

