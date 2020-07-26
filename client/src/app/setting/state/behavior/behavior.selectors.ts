import {Selector} from '@ngxs/store';

import {BehaviorState, BehaviorStateModel} from './behavior.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class BehaviorSelectors {
    @Selector( [ BehaviorState.entities ] )
    static entities( entities: BehaviorStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ BehaviorState.selected ] )
    static selected( selected: BehaviorStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ BehaviorState.isLoading ] )
    static isLoading( isLoading: BehaviorStateModel['isLoading'] ) {
        return isLoading;
    }
}
