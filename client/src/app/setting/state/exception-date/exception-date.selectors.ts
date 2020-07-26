import {Selector} from '@ngxs/store';

import {ExceptionDateState, ExceptionDateStateModel} from './exception-date.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class ExceptionDateSelectors {
    @Selector( [ ExceptionDateState.entities ] )
    static entities( entities: ExceptionDateStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ ExceptionDateState.selected ] )
    static selected( selected: ExceptionDateStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ ExceptionDateState.isLoading ] )
    static isLoading( isLoading: ExceptionDateStateModel['isLoading'] ) {
        return isLoading;
    }
}
