import {UnityModel} from './unity.model';
import {UserModel} from './user.model';

export interface CashierModel {
    id?: number;
    code: string;
    unity: UnityModel;
    user: UserModel;
    value: string;
    amount: string;
    note: string;
    operation: string;
    action: string;
    status: string;
}
