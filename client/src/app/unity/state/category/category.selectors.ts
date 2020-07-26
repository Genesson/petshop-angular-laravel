import {Selector} from '@ngxs/store';

import {CategoryState, CategoryStateModel} from './category.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class CategorySelectors {
    @Selector( [ CategoryState.entities ] )
    static entities( entities: CategoryStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ CategoryState.selected ] )
    static selected( selected: CategoryStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ CategoryState.isLoading ] )
    static isLoading( isLoading: CategoryStateModel['isLoading'] ) {
        return isLoading;
    }
}
