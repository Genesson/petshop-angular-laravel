import {PackagePetModel} from '../../../shared/models/package-pet.model';
import {PetModel} from '../../../shared/models/pet.model';

export class OpenPackagePetCreateModal {
    static readonly type = '[Packages] Open Package Pet Create Modal';

    constructor(public payload: { editing: boolean, data?: PackagePetModel | PetModel }) {
    }
}

export class ClosePackagePetCreateModal {
    static readonly type = '[Packages] Close Package Pet Create Modal';
}

