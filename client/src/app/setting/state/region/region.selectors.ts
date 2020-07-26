import {Selector} from '@ngxs/store';

import {RegionState, RegionStateModel} from './region.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class RegionSelectors {
    @Selector( [ RegionState.entities ] )
    static entities( entities: RegionStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ RegionState.selected ] )
    static selected( selected: RegionStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ RegionState.isLoading ] )
    static isLoading( isLoading: RegionStateModel['isLoading'] ) {
        return isLoading;
    }
}
