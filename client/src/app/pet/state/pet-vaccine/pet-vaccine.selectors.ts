import {Selector} from '@ngxs/store';

import {PetVaccineState, PetVaccineStateModel} from './pet-vaccine.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PetVaccineSelectors {
    @Selector([PetVaccineState.entities])
    static entities(entities: PetVaccineStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PetVaccineState.selected])
    static selected(selected: PetVaccineStateModel['selected']) {
        return selected;
    }

    @Selector([PetVaccineState.isLoading])
    static isLoading(isLoading: PetVaccineStateModel['isLoading']) {
        return isLoading;
    }
}
