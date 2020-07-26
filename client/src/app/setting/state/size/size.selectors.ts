import {Selector} from '@ngxs/store';

import {SizeState, SizeStateModel} from './size.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class SizeSelectors {
    @Selector( [ SizeState.entities ] )
    static entities( entities: SizeStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ SizeState.selected ] )
    static selected( selected: SizeStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ SizeState.isLoading ] )
    static isLoading( isLoading: SizeStateModel['isLoading'] ) {
        return isLoading;
    }
}
