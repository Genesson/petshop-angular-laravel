import {Selector} from '@ngxs/store';

import {PriceVariationState, PriceVariationStateModel} from './price-variation.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PriceVariationSelectors {
    @Selector([PriceVariationState.entities])
    static entities(entities: PriceVariationStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([PriceVariationState.selected])
    static selected(selected: PriceVariationStateModel['selected']) {
        return selected;
    }

    @Selector([PriceVariationState.isLoading])
    static isLoading(isLoading: PriceVariationStateModel['isLoading']) {
        return isLoading;
    }
}
