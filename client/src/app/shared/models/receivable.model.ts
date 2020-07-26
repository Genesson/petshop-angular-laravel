import {OrderModel} from './order.model';
import {UserModel} from './user.model';
import {PetModel} from './pet.model';
import {CardFlagModel} from './cardFlag.model';

export interface ReceivableModel {
    id?: number;
    unity: number;
    order: OrderModel;
    pet: PetModel;
    tutor: UserModel;
    quota: string;
    value: number | string;
    payment_with: string;
    flag: CardFlagModel,
    voucher_number: number,
    cpf: string,
    cpf_number: string,
    expiration: any;
    receivement_at: string;
    user: UserModel;
    productsName: string;
    servicesName: string;
    created_at: string;
}
