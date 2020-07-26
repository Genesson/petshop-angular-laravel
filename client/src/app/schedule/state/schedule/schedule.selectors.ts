import {Selector} from '@ngxs/store';

import {ScheduleState, ScheduleStateModel} from './schedule.state';

import {NgxsEntityStateSelector} from '../../../shared/libs/ngxs-entity-state/src/lib';

import {ScheduleModel} from '../../../shared/models/schedule.model';

export class ScheduleSelectors {
    @Selector([ScheduleState.entities])
    static entities(entities: ScheduleStateModel['entities']) {
        return new NgxsEntityStateSelector()
            .getEntities(entities)
            .filter(
                (schedule: ScheduleModel) => schedule.service.type !== 'HOTEL'
            );
    }

    @Selector([ScheduleState.entities])
    static entitiesList(entities: ScheduleStateModel['entities']) {
        return new NgxsEntityStateSelector()
            .getEntities(entities)
            .filter(
                (schedule: ScheduleModel) =>
                    schedule.service.type !== 'DAY_CARE'
            );
    }

    @Selector([ScheduleState.entities])
    static entitiesCheck(entities: ScheduleStateModel['entities']) {
        return new NgxsEntityStateSelector()
            .getEntities(entities)
            .filter((schedule: ScheduleModel) => schedule.check === true);
    }

    @Selector([ScheduleState.entities])
    static entitiesHotel(entities: ScheduleStateModel['entities']) {
        return new NgxsEntityStateSelector()
            .getEntities(entities)
            .filter(
                (schedule: ScheduleModel) => schedule.service.type === 'HOTEL'
            );
    }

    @Selector([ScheduleState.selected])
    static selected(selected: ScheduleStateModel['selected']) {
        return selected;
    }

    @Selector([ScheduleState.isLoading])
    static isLoading(isLoading: ScheduleStateModel['isLoading']) {
        return isLoading;
    }
}
