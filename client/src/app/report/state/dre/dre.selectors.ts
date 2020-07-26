import {Selector} from '@ngxs/store';

import {DreState, DreStateModel} from './dre.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class DreSelectors {
    @Selector([DreState.entities])
    static entities(entities: DreStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([DreState.selected])
    static selected(selected: DreStateModel['selected']) {
        return selected;
    }

    @Selector([DreState.isLoading])
    static isLoading(isLoading: DreStateModel['isLoading']) {
        return isLoading;
    }
}
