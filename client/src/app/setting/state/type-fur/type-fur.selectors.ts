import {Selector} from '@ngxs/store';

import {TypeFurState, TypeFurStateModel} from './type-fur.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class TypeFurSelectors {
    @Selector( [ TypeFurState.entities ] )
    static entities( entities: TypeFurStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ TypeFurState.selected ] )
    static selected( selected: TypeFurStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ TypeFurState.isLoading ] )
    static isLoading( isLoading: TypeFurStateModel['isLoading'] ) {
        return isLoading;
    }
}
