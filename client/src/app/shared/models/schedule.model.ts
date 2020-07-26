import {UnityModel} from './unity.model';
import {UserModel} from './user.model';
import {PetModel} from './pet.model';
import {ServiceModel} from './service.model';
import {RoomModel} from './room.model';
import {DaycareModel} from './daycare.model';
import {OrderModel} from './order.model';
import {PetPackageModel} from './pet-package.model';

export interface ScheduleModel {
    id?: number;
    check: boolean;
    unity: UnityModel;
    user: UserModel;
    pet: PetModel;
    service: ServiceModel;
    room: RoomModel;
    package: PetPackageModel;
    daycare: DaycareModel;
    order: OrderModel;
    date: string;
    hour: string;
    taxi: string;
    time: number;
    date_checkin: string;
    hour_checkin: string;
    date_checkout: string;
    hour_checkout: string;
    daily: number;
    custom: number;
    finished_at: string;
    status: boolean;
    title: string;
    startTime: string;
    endTime: string;
    allDay: boolean;
    desc: string;
}
