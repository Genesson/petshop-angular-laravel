import {Selector} from '@ngxs/store';

import {ViaCepState, ViaCepStateModel} from './via-cep.state';

import {NgxsEntityStateSelector} from '../../../../libs/ngxs-entity-state/src/lib';

export class ViaCepSelectors {
    @Selector([ViaCepState.entities])
    static entities(entities: ViaCepStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([ViaCepState.selected])
    static selected(selected: ViaCepStateModel['selected']) {
        return selected;
    }
}
