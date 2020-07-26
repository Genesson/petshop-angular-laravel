import {ScheduleModel} from '../../../shared/models/schedule.model';
import {DaycareModel} from '../../../shared/models/daycare.model';

export class SelectSchedule {
    static readonly type = '[Schedules] Select Schedule Success';

    constructor(public payload: ScheduleModel) {
    }
}

export class SelectAllSchedule {
    static readonly type = '[Schedules] Select Schedule All Success';

    constructor(public payload: ScheduleModel[]) {
    }
}

export class LoadSchedules {
    static readonly type = '[Schedules] Load Schedules';
}

export class LoadSchedulesByService {
    static readonly type = '[Schedules] Load Schedules By Service';

    constructor(public payload: number) {
    }
}

export class LoadSchedulesSuccess {
    static readonly type = '[Schedules] Load Schedules Success';

    constructor(public payload: ScheduleModel[]) {
    }
}

export class LoadSchedulesFail {
    static readonly type = '[Schedules] Load Schedules Fail';

    constructor(public payload: any) {
    }
}

export class LoadDaycare {
    static readonly type = '[Schedules] Load Daycare';
}

export class LoadDaycareSuccess {
    static readonly type = '[Schedules] Load Daycare Success';

    constructor(public payload: ScheduleModel[]) {
    }
}

export class LoadDaycareFail {
    static readonly type = '[Schedules] Load Daycare Fail';

    constructor(public payload: any) {
    }
}

export class CreateSchedule {
    static readonly type = '[Schedules] Create Schedule';

    constructor(public payload: ScheduleModel) {
    }
}

export class CreateScheduleSuccess {
    static readonly type = '[Schedules] Create Schedule Success';

    constructor(public payload: ScheduleModel) {
    }
}

export class CreateScheduleFail {
    static readonly type = '[Schedules] Create Schedule Fail';

    constructor(public payload: any) {
    }
}

export class UpdateSchedule {
    static readonly type = '[Schedules] Update Schedule';

    constructor(public payload: ScheduleModel) {
    }
}

export class UpdateScheduleSuccess {
    static readonly type = '[Schedules] Update Schedule Success';

    constructor(public payload: ScheduleModel) {
    }
}

export class UpdateScheduleFail {
    static readonly type = '[Schedules] Update Schedule Fail';

    constructor(public payload: any) {
    }
}

export class UpdateScheduleAll {
    static readonly type = '[Schedules] Update Schedule All';

    constructor(public payload: { schedule: ScheduleModel[], action: string }) {
    }
}

export class UpdateScheduleAllSuccess {
    static readonly type = '[Schedules] Update Schedule All Success';

    constructor(public payload: ScheduleModel[]) {
    }
}

export class UpdateScheduleAllFail {
    static readonly type = '[Schedules] Update Schedule All Fail';

    constructor(public payload: any) {
    }
}

export class UpdateScheduleDaycare {
    static readonly type = '[Schedules] Update Schedule Daycare';

    constructor(public payload: DaycareModel) {
    }
}

export class UpdateScheduleDaycareSuccess {
    static readonly type = '[Schedules] Update Schedule Daycare Success';

    constructor(public payload: ScheduleModel) {
    }
}

export class UpdateScheduleDaycareFail {
    static readonly type = '[Schedules] Update Schedule Daycare Fail';

    constructor(public payload: any) {
    }
}

export class FinishedSchedule {
    static readonly type = '[Schedules] Finished Schedule';

    constructor(public payload: ScheduleModel) {
    }
}

export class FinishedScheduleSuccess {
    static readonly type = '[Schedules] Finished Schedule Success';

    constructor(public payload: ScheduleModel) {
    }
}

export class FinishedScheduleFail {
    static readonly type = '[Schedules] Finished Schedule Fail';

    constructor(public payload: any) {
    }
}

export class DeleteSchedule {
    static readonly type = '[Schedules] Delete Schedule';

    constructor(public payload: ScheduleModel) {
    }
}

export class DeleteScheduleSuccess {
    static readonly type = '[Schedules] Delete Schedule Success';

    constructor(public payload: ScheduleModel) {
    }
}

export class DeleteScheduleFail {
    static readonly type = '[Schedules] Delete Schedule Fail';

    constructor(public payload: any) {
    }
}

export class DeleteScheduleDaycare {
    static readonly type = '[Schedules] Delete Schedule Daycare';

    constructor(public payload: DaycareModel) {
    }
}

export class DeleteScheduleDaycareSuccess {
    static readonly type = '[Schedules] Delete Schedule Daycare Success';

    constructor(public payload: ScheduleModel) {
    }
}

export class DeleteScheduleDaycareFail {
    static readonly type = '[Schedules] Delete Schedule Daycare Fail';

    constructor(public payload: any) {
    }
}
