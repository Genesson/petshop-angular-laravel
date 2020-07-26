import {Selector} from '@ngxs/store';

import {ProvinceState, ProvinceStateModel} from './province.state';

import {NgxsEntityStateSelector} from '../../../libs/ngxs-entity-state/src/lib';

export class ProvinceSelectors {
    @Selector( [ ProvinceState.entities ] )
    static entities( entities: ProvinceStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ ProvinceState.selected ] )
    static selected( selected: ProvinceStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ ProvinceState.isLoading ] )
    static isLoading( isLoading: ProvinceStateModel['isLoading'] ) {
        return isLoading;
    }
}
