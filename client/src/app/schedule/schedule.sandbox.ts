import {Injectable} from '@angular/core';

import {Select, Store} from '@ngxs/store';

import {Observable} from 'rxjs';

import {ScheduleSelectors} from './state/schedule/schedule.selectors';

import {ScheduleModel} from '../shared/models/schedule.model';
import {DaycareModel} from '../shared/models/daycare.model';

import {
    SelectSchedule,
    SelectAllSchedule,
    LoadSchedules,
    LoadSchedulesByService,
    CreateSchedule,
    UpdateSchedule,
    UpdateScheduleAll,
    UpdateScheduleDaycare,
    FinishedSchedule,
    DeleteSchedule,
    LoadDaycare,
    DeleteScheduleDaycare,
} from './state/schedule/schedule.actions';
import {
    OpenScheduleListModal,
    CloseScheduleListModal,
} from './state/schedule-list-modal/schedule-list-modal.actions';

@Injectable({
    providedIn: 'root',
})
export class ScheduleSandbox {
    @Select(ScheduleSelectors.entities) schedulesCollection$: Observable<ScheduleModel[]>;

    @Select(ScheduleSelectors.entitiesList) schedulesListCollection$: Observable<ScheduleModel[]>;

    @Select(ScheduleSelectors.entitiesCheck) schedulesCheckCollection$: Observable<ScheduleModel[]>;

    @Select(ScheduleSelectors.entitiesHotel) schedulesHotelCollection$: Observable<ScheduleModel[]>;

    @Select(ScheduleSelectors.selected) scheduleSelected$: Observable<ScheduleModel>;

    @Select(ScheduleSelectors.isLoading) isLoadingSchedule$: Observable<boolean>;

    constructor(private store: Store) {}

    public selectSchedule(schedule: ScheduleModel) {
        this.store.dispatch(new SelectSchedule(schedule));
    }

    public selectAllSchedule() {
        this.store.dispatch(
            new SelectAllSchedule(this.store.selectSnapshot(ScheduleSelectors.entities))
        );
    }

    public loadSchedules() {
        this.store.dispatch(new LoadSchedules());
    }

    public loadSchedulesByService(id: number) {
      this.store.dispatch(new LoadSchedulesByService(id));
    }

    public loadDaycare() {
        this.store.dispatch(new LoadDaycare());
    }

    public createSchedule(schedule: ScheduleModel) {
        this.store.dispatch(new CreateSchedule(schedule));
    }

    public updateSchedule(schedule: ScheduleModel) {
        this.store.dispatch(new UpdateSchedule(schedule));
    }

    public updateScheduleAll(schedule, action: string) {
        this.store.dispatch(new UpdateScheduleAll({schedule, action}));
    }

    public updateScheduleDaycare(daycare: DaycareModel) {
        this.store.dispatch(new UpdateScheduleDaycare(daycare));
    }

    public finishedSchedule(schedule: ScheduleModel) {
        this.store.dispatch(new FinishedSchedule(schedule));
    }

    public deleteSchedule(schedule: ScheduleModel) {
        this.store.dispatch(new DeleteSchedule(schedule));
    }

    public deleteScheduleDaycare(daycare: DaycareModel) {
        this.store.dispatch(new DeleteScheduleDaycare(daycare));
    }

    public openScheduleListModal() {
        this.store.dispatch(new OpenScheduleListModal());
    }

    public closeScheduleListModal() {
        this.store.dispatch(new CloseScheduleListModal());
    }
}
