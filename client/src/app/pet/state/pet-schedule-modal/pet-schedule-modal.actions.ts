import {PetModel} from '../../../shared/models/pet.model';
import {ServiceModel} from '../../../shared/models/service.model';

export class OpenPetScheduleModal {
    static readonly type = '[Pets] Open Pet Schedule Modal';

    constructor(public payload: { service: ServiceModel, data?: PetModel }) {
    }
}

export class ClosePetScheduleModal {
    static readonly type = '[Pets] Close Pet Schedule Modal';
}

