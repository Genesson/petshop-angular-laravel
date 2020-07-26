import {Selector} from '@ngxs/store';

import {CashierState, CashierStateModel} from './cashier.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class CashierSelectors {
    @Selector([CashierState.entities])
    static entities(entities: CashierStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([CashierState.selected])
    static selected(selected: CashierStateModel['selected']) {
        return selected;
    }

    @Selector([CashierState.isLoading])
    static isLoading(isLoading: CashierStateModel['isLoading']) {
        return isLoading;
    }
}
