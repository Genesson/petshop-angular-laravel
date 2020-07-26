import {DailyModel} from '../../../shared/models/daily.model';

export class LoadDailyCalculation {
    static readonly type = '[Pets] Load Daily Calculation';

    constructor(
        public payload: {
            checkin_date: string,
            checkin_hour: string,
            checkout_date: string,
            checkout_hour: string,
            unity_id: number,
            pet_size: number
        }) {
    }
}

export class LoadDailyCalculationSuccess {
    static readonly type = '[Pets] Load Daily Calculation Success';

    constructor(public payload: DailyModel) {
    }
}

export class LoadDailyCalculationFail {
    static readonly type = '[Pets] Load Daily Calculation Fail';

    constructor(public payload: any) {
    }
}
