import {Selector} from '@ngxs/store';

import {NfceState, NfceStateModel} from './nfce.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class NfceSelectors {
    @Selector([NfceState.entities])
    static entities(entities: NfceStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([NfceState.selected])
    static selected(selected: NfceStateModel['selected']) {
        return selected;
    }

    @Selector([NfceState.isLoading])
    static isLoading(isLoading: NfceStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([NfceState.paginator])
    static paginator(paginator: NfceStateModel['paginator']) {
      return paginator;
    }
}
