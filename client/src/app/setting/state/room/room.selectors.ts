import {Selector} from '@ngxs/store';

import {RoomState, RoomStateModel} from './room.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class RoomSelectors {
    @Selector( [ RoomState.entities ] )
    static entities( entities: RoomStateModel['entities'] ) {
        return new NgxsEntityStateSelector().getEntities( entities );
    }

    @Selector( [ RoomState.selected ] )
    static selected( selected: RoomStateModel['selected'] ) {
        return selected;
    }

    @Selector( [ RoomState.isLoading ] )
    static isLoading( isLoading: RoomStateModel['isLoading'] ) {
        return isLoading;
    }
}
