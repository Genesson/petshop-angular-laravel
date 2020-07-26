import {Selector} from '@ngxs/store';

import {TypeState, TypeStateModel} from './type.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class TypeSelectors {
    @Selector( [ TypeState.entities ] )
    static entities( entities: TypeStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ TypeState.selected ] )
    static selected( selected: TypeStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ TypeState.isLoading ] )
    static isLoading( isLoading: TypeStateModel['isLoading'] ) {
        return isLoading;
    }
}
