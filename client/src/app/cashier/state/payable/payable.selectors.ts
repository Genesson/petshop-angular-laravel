import {Selector} from '@ngxs/store';

import {PayableState, PayableStateModel} from './payable.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class PayableSelectors {
    @Selector( [ PayableState.entities ] )
    static entities( entities: PayableStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ PayableState.selected ] )
    static selected( selected: PayableStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ PayableState.isLoading ] )
    static isLoading( isLoading: PayableStateModel['isLoading'] ) {
        return isLoading;
    }
}
