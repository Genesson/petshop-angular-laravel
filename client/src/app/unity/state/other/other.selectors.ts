import {Selector} from '@ngxs/store';

import {OtherState, OtherStateModel} from './other.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class OtherSelectors {
    @Selector([OtherState.entities])
    static entities(entities: OtherStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([OtherState.selected])
    static selected(selected: OtherStateModel['selected']) {
        return selected;
    }

    @Selector([OtherState.isLoading])
    static isLoading(isLoading: OtherStateModel['isLoading']) {
        return isLoading;
    }
}
