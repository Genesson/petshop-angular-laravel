import {Selector} from '@ngxs/store';

import {SubServiceState, SubServiceStateModel} from './sub-service.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class SubServiceSelectors {
    @Selector( [ SubServiceState.entities ] )
    static entities( entities: SubServiceStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ SubServiceState.selected ] )
    static selected( selected: SubServiceStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ SubServiceState.isLoading ] )
    static isLoading( isLoading: SubServiceStateModel['isLoading'] ) {
        return isLoading;
    }
}
