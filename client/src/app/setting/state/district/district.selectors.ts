import {Selector} from '@ngxs/store';

import {DistrictState, DistrictStateModel} from './district.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class DistrictSelectors {
    @Selector( [ DistrictState.entities ] )
    static entities( entities: DistrictStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ DistrictState.selected ] )
    static selected( selected: DistrictStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ DistrictState.isLoading ] )
    static isLoading( isLoading: DistrictStateModel['isLoading'] ) {
        return isLoading;
    }
}
