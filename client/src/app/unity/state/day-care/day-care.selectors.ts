import {Selector} from '@ngxs/store';

import {DayCareState, DayCareStateModel} from './day-care.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class DayCareSelectors {
    @Selector([DayCareState.entities])
    static entities(entities: DayCareStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([DayCareState.selected])
    static selected(selected: DayCareStateModel['selected']) {
        return selected;
    }

    @Selector([DayCareState.isLoading])
    static isLoading(isLoading: DayCareStateModel['isLoading']) {
        return isLoading;
    }
}
