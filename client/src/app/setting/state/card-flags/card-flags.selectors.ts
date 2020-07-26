import {Selector} from '@ngxs/store';

import {CardFlagsState, CardFlagsStateModel} from './card-flags.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class CardFlagsSelectors {
    @Selector( [ CardFlagsState.entities ] )
    static entities( entities: CardFlagsStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ CardFlagsState.selected ] )
    static selected( selected: CardFlagsStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ CardFlagsState.isLoading ] )
    static isLoading( isLoading: CardFlagsStateModel['isLoading'] ) {
        return isLoading;
    }
}
