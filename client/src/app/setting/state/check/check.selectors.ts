import {Selector} from '@ngxs/store';

import {CheckState, CheckStateModel} from './check.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {CheckModel} from '../../../shared/models/check.model';

export class CheckSelectors {
    @Selector([CheckState.entities])
    static entities(entities: CheckStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([CheckState.selected])
    static selected(selected: CheckStateModel['selected']) {
        return selected;
    }

    @Selector([CheckState.isLoading])
    static isLoading(isLoading: CheckStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([CheckState.entities])
    static checkIn(entities: CheckStateModel['entities']) {
        return new NgxsEntityStateSelector()
            .getEntities(entities)
            .filter((check: CheckModel) => check.type === 'CHECK-IN')
            .map((check: CheckModel) => check.hour)
            .reduce((previousValue, currentValue) => currentValue, 0);
    }

    @Selector([CheckState.entities])
    static checkOut(entities: CheckStateModel['entities']) {
        return new NgxsEntityStateSelector()
            .getEntities(entities)
            .filter((check: CheckModel) => check.type === 'CHECK-OUT')
            .map((check: CheckModel) => check.hour)
            .reduce((previousValue, currentValue) => currentValue, 0);
    }
}
