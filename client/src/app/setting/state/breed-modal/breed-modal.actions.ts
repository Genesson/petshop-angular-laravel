import {BreedModel} from '../../../shared/models/breed.model';

export class OpenBreedModal {
    static readonly type = '[Breeds] Open Breed Modal';

    constructor(public payload: { editing: boolean, data?: BreedModel }) {
    }
}

export class CloseBreedModal {
    static readonly type = '[Breeds] Close Breed Modal';
}

