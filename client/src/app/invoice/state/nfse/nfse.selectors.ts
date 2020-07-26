import {Selector} from '@ngxs/store';

import {NfseState, NfseStateModel} from './nfse.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class NfseSelectors {
    @Selector([NfseState.entities])
    static entities(entities: NfseStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([NfseState.selected])
    static selected(selected: NfseStateModel['selected']) {
        return selected;
    }

    @Selector([NfseState.isLoading])
    static isLoading(isLoading: NfseStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([NfseState.paginator])
    static paginator(paginator: NfseStateModel['paginator']) {
      return paginator;
    }
}
