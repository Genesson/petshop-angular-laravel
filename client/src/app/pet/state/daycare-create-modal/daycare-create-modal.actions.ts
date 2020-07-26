import {PetModel} from '../../../shared/models/pet.model';
import {ServiceModel} from '../../../shared/models/service.model';

export class OpenDaycareCreateModal {
    static readonly type = '[Pets] Open Open Daycare Create Modal';

    constructor(public payload: { service: ServiceModel, data?: PetModel }) {
    }
}

export class CloseDaycareCreateModal {
    static readonly type = '[Pets] Close Daycare Create Modal';
}

