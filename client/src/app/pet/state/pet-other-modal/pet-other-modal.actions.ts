import {PetModel} from '../../../shared/models/pet.model';
import {CategoryModel} from '../../../shared/models/category.model';

export class OpenPetOtherModal {
    static readonly type = '[Pets] Open Pet Other Modal';

    constructor(public payload: {data: PetModel, category: CategoryModel}) {
    }
}

export class ClosePetOtherModal {
    static readonly type = '[Pets] Close Pet Other Modal';
}

