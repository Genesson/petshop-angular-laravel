import {PetModel} from '../../../shared/models/pet.model';
import {CategoryModel} from '../../../shared/models/category.model';

export class OpenPetSpaModal {
    static readonly type = '[Pets] Open Pet Spa Modal';

    constructor(public payload: {data: PetModel, category: CategoryModel}) {
    }
}

export class ClosePetSpaModal {
    static readonly type = '[Pets] Close Pet Spa Modal';
}

