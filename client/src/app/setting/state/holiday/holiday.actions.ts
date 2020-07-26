import {HolidayModel} from '../../../shared/models/holiday.model';

export class SelectHoliday {
    static readonly type = '[Holidays] Select Holiday Success';

    constructor(public payload: HolidayModel) {
    }
}

export class LoadHolidays {
    static readonly type = '[Holidays] Load Holidays';
}

export class LoadHolidaysSuccess {
    static readonly type = '[Holidays] Load Holidays Success';

    constructor(public payload: HolidayModel[]) {
    }
}

export class LoadHolidaysFail {
    static readonly type = '[Holidays] Load Holidays Fail';

    constructor(public payload: string) {
    }
}

export class CreateHoliday {
    static readonly type = '[Holidays] Create Holiday';

    constructor(public payload: HolidayModel) {
    }
}

export class CreateHolidaySuccess {
    static readonly type = '[Holidays] Create Holiday Success';

    constructor(public payload: HolidayModel[]) {
    }
}

export class CreateHolidayFail {
    static readonly type = '[Holidays] Create Holiday Fail';

    constructor(public payload: any) {
    }
}

export class UpdateHoliday {
    static readonly type = '[Holidays] Update Holiday';

    constructor(public payload: HolidayModel) {
    }
}

export class UpdateHolidaySuccess {
    static readonly type = '[Holidays] Update Holiday Success';

    constructor(public payload: HolidayModel) {
    }
}

export class UpdateHolidayFail {
    static readonly type = '[Holidays] Update Holiday Fail';

    constructor(public payload: any) {
    }
}

export class DeleteHoliday {
    static readonly type = '[Holidays] Delete Holiday';

    constructor(public payload: HolidayModel) {
    }
}

export class DeleteHolidaySuccess {
    static readonly type = '[Holidays] Delete Holiday Success';

    constructor(public payload: HolidayModel) {
    }
}

export class DeleteHolidayFail {
    static readonly type = '[Holidays] Delete Holiday Fail';

    constructor(public payload: any) {
    }
}
