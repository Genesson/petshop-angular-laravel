import {Selector} from '@ngxs/store';

import {CityState, CityStateModel} from './city.state';

import {NgxsEntityStateSelector} from '../../../libs/ngxs-entity-state/src/lib';

export class CitySelectors {
    @Selector( [ CityState.entities ] )
    static entities( entities: CityStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ CityState.selected ] )
    static selected( selected: CityStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ CityState.isLoading ] )
    static isLoading( isLoading: CityStateModel['isLoading'] ) {
        return isLoading;
    }
}
