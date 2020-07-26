import {UnityModel} from './unity.model';

export interface RoomModel {
    id?: number;
    unity: UnityModel;
    description: string;
    number: number;
    status: string;
}
