import {Selector} from '@ngxs/store';

import {HolidayState, HolidayStateModel} from './holiday.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class HolidaySelectors {
    @Selector( [ HolidayState.entities ] )
    static entities( entities: HolidayStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ HolidayState.selected ] )
    static selected( selected: HolidayStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ HolidayState.isLoading ] )
    static isLoading( isLoading: HolidayStateModel['isLoading'] ) {
        return isLoading;
    }
}
