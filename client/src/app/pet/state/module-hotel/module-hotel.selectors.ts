import {Selector} from '@ngxs/store';

import {ModuleHotelState, ModuleHotelStateModel} from './module-hotel.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class ModuleHotelSelectors {
    @Selector([ModuleHotelState.entities])
    static entities(entities: ModuleHotelStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([ModuleHotelState.selected])
    static selected(selected: ModuleHotelStateModel['selected']) {
        return selected;
    }

    @Selector([ModuleHotelState.isLoading])
    static isLoading(isLoading: ModuleHotelStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([ModuleHotelState.daily])
    static daily(daily: ModuleHotelStateModel['daily']) {
        return daily;
    }
}
