import {Selector} from '@ngxs/store';

import {PetSitterState, PetSitterStateModel} from './pet-sitter.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PetSitterSelectors {
    @Selector([PetSitterState.entities])
    static entities(entities: PetSitterStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PetSitterState.selected])
    static selected(selected: PetSitterStateModel['selected']) {
        return selected;
    }

    @Selector([PetSitterState.isLoading])
    static isLoading(isLoading: PetSitterStateModel['isLoading']) {
        return isLoading;
    }
}
