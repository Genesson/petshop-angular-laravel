import {Selector} from '@ngxs/store';

import {ShowerState, ShowerStateModel} from './shower.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class ShowerSelectors {
    @Selector([ShowerState.entities])
    static entities(entities: ShowerStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([ShowerState.selected])
    static selected(selected: ShowerStateModel['selected']) {
        return selected;
    }

    @Selector([ShowerState.isLoading])
    static isLoading(isLoading: ShowerStateModel['isLoading']) {
        return isLoading;
    }
}
