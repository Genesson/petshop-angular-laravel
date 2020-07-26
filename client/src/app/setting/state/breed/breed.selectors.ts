import {Selector} from '@ngxs/store';

import {BreedState, BreedStateModel} from './breed.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class BreedSelectors {
    @Selector([BreedState.entities])
    static entities(entities: BreedStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([BreedState.selected])
    static selected(selected: BreedStateModel['selected']) {
        return selected;
    }

    @Selector([BreedState.isLoading])
    static isLoading(isLoading: BreedStateModel['isLoading']) {
        return isLoading;
    }
}
