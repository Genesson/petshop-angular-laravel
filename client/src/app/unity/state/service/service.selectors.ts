import {Selector} from '@ngxs/store';

import {ServiceState, ServiceStateModel} from './service.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {ServiceModel} from '../../../shared/models/service.model';

export class ServiceSelectors {
    @Selector([ServiceState.entities])
    static entities(entities: ServiceStateModel['entities']) {
        return new NgxsEntityStateSelector().getEntities(entities);
    }

    @Selector([ServiceState.entities])
    static entitiesNotDaycareAndHotel(entities: ServiceStateModel['entities']) {
        return new NgxsEntityStateSelector()
            .getEntities(entities)
            .filter((service: ServiceModel) => service.type !== 'DAY_CARE')
            .filter((service: ServiceModel) => service.type !== 'HOTEL');
    }

    @Selector([ServiceState.selected])
    static selected(selected: ServiceStateModel['selected']) {
        return selected;
    }

    @Selector([ServiceState.isLoading])
    static isLoading(isLoading: ServiceStateModel['isLoading']) {
        return isLoading;
    }
}
