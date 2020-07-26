import {Selector} from '@ngxs/store';

import {ReceivableState, ReceivableStateModel} from './receivable.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';
import {ReceivableModel} from '../../../shared/models/receivable.model';

export class ReceivableSelectors {
    @Selector([ReceivableState.entities])
    static entities(entities: ReceivableStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([ReceivableState.selected])
    static selected(selected: ReceivableStateModel['selected']) {
        return selected;
    }

    @Selector([ReceivableState.isLoading])
    static isLoading(isLoading: ReceivableStateModel['isLoading']) {
        return isLoading;
    }

    @Selector([ReceivableState.totals])
    static totals(totals: ReceivableStateModel['totals']) {
        return totals;
    }

    @Selector([ReceivableState.entities])
    static total(entities: ReceivableStateModel['entities']) {
        return new NgxsEntityStateSelector()
            .getEntities(entities)
            .map((receivable: ReceivableModel) => receivable.value)
            .reduce((total, currentValue) => Number(total) + Number(currentValue));
    }
}
