import {UnityModel} from './unity.model';

export interface ExceptionDateModel {
    id?: number;
    unity: UnityModel;
    description: string;
    date_start: Date;
    date_end: Date;
    status: string;
}
