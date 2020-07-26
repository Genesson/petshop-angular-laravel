import {Selector} from '@ngxs/store';

import {PetEvaluationState, PetEvaluationStateModel} from './pet-evaluation.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PetEvaluationSelectors {
    @Selector([PetEvaluationState.entities])
    static entities(entities: PetEvaluationStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PetEvaluationState.selected])
    static selected(selected: PetEvaluationStateModel['selected']) {
        return selected;
    }

    @Selector([PetEvaluationState.isLoading])
    static isLoading(isLoading: PetEvaluationStateModel['isLoading']) {
        return isLoading;
    }
}
