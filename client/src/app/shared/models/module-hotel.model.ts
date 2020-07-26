import {PetModel} from './pet.model';
import {RoomModel} from './room.model';

export interface ModuleHotelModel {
    id?: number;
    date_checkin: string;
    hour_checkin: string;
    date_checkout: string;
    hour_checkout: string;
    room: RoomModel;
    pet: PetModel;
}
