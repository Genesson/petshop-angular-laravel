import {Selector} from '@ngxs/store';

import {HotelState, HotelStateModel} from './hotel.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class HotelSelectors {
    @Selector([HotelState.entities])
    static entities(entities: HotelStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([HotelState.selected])
    static selected(selected: HotelStateModel['selected']) {
        return selected;
    }

    @Selector([HotelState.isLoading])
    static isLoading(isLoading: HotelStateModel['isLoading']) {
        return isLoading;
    }
}
