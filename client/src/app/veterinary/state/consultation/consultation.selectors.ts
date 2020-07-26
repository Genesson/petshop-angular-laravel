import {Selector} from '@ngxs/store';

import {ConsultationState, ConsultationStateModel} from './consultation.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

export class ConsultationSelectors {
    @Selector([ConsultationState.entities])
    static entities(entities: ConsultationStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([ConsultationState.selected])
    static selected(selected: ConsultationStateModel['selected']) {
        return selected;
    }

    @Selector([ConsultationState.isLoading])
    static isLoading(isLoading: ConsultationStateModel['isLoading']) {
        return isLoading;
    }
}
