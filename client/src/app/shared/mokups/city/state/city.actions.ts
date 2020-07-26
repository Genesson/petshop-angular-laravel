import {CityModel} from '../../../models/city.model';

export class LoadCities {
    static readonly type = '[Cities] Load Cities';

    constructor(public payload: number) {
    }
}

export class LoadCitiesSuccess {
    static readonly type = '[Cities] Load Cities Success';

    constructor(public payload: CityModel[]) {
    }
}

export class LoadCitiesFail {
    static readonly type = '[Cities] Load Cities Fail';

    constructor(public payload: string) {
    }
}
