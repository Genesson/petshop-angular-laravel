import {Selector} from '@ngxs/store';

import {TransportState, TransportStateModel} from './transport.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class TransportSelectors {
    @Selector([TransportState.entities])
    static entities(entities: TransportStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([TransportState.selected])
    static selected(selected: TransportStateModel['selected']) {
        return selected;
    }

    @Selector([TransportState.isLoading])
    static isLoading(isLoading: TransportStateModel['isLoading']) {
        return isLoading;
    }
}
