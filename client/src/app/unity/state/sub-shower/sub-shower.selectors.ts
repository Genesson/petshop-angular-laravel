import {Selector} from '@ngxs/store';

import {SubShowerState, SubShowerStateModel} from './sub-shower.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class SubShowerSelectors {
    @Selector([SubShowerState.entities])
    static entities(entities: SubShowerStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([SubShowerState.selected])
    static selected(selected: SubShowerStateModel['selected']) {
        return selected;
    }

    @Selector([SubShowerState.isLoading])
    static isLoading(isLoading: SubShowerStateModel['isLoading']) {
        return isLoading;
    }
}
