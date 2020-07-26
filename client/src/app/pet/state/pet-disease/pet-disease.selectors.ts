import {Selector} from '@ngxs/store';

import {PetDiseaseState, PetDiseaseStateModel} from './pet-disease.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PetDiseaseSelectors {
    @Selector([PetDiseaseState.entities])
    static entities(entities: PetDiseaseStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PetDiseaseState.selected])
    static selected(selected: PetDiseaseStateModel['selected']) {
        return selected;
    }

    @Selector([PetDiseaseState.isLoading])
    static isLoading(isLoading: PetDiseaseStateModel['isLoading']) {
        return isLoading;
    }
}
