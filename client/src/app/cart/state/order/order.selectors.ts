import {Selector} from '@ngxs/store';

import {OrderState, OrderStateModel} from './order.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class OrderSelectors {
    @Selector([OrderState.entities])
    static entities(entities: OrderStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([OrderState.selected])
    static selected(selected: OrderStateModel['selected']) {
        return selected;
    }

    @Selector([OrderState.isLoading])
    static isLoading(isLoading: OrderStateModel['isLoading']) {
        return isLoading;
    }
}
