import {ServiceModel} from '../../../shared/models/service.model';

export class OpenPetSitterModal {
    static readonly type = '[Units] Open PetSitter Modal';

    constructor(public payload: { editing: boolean, data?: ServiceModel }) {
    }
}

export class ClosePetSitterModal {
    static readonly type = '[Units] Close PetSitter Modal';
}

