import {PetModel} from '../../../shared/models/pet.model';

export class OpenModuleHotelModal {
    static readonly type = '[Pets] Open Pet Resort Modal';

    constructor(public payload: PetModel) {
    }
}

export class CloseModuleHotelModal {
    static readonly type = '[Pets] Close Pet Resort Modal';
}

