import {Selector} from '@ngxs/store';

import {PetMedicineState, PetMedicineStateModel} from './pet-medicine.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PetMedicineSelectors {
    @Selector([PetMedicineState.entities])
    static entities(entities: PetMedicineStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PetMedicineState.selected])
    static selected(selected: PetMedicineStateModel['selected']) {
        return selected;
    }

    @Selector([PetMedicineState.isLoading])
    static isLoading(isLoading: PetMedicineStateModel['isLoading']) {
        return isLoading;
    }
}
