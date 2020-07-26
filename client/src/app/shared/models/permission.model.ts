import {UnityModel} from './unity.model';

export interface PermissionModel {
    id?: number;
    unity: UnityModel;
    description: string;
    pets: boolean;
    daily: boolean;
    users: boolean;
    settings: boolean;
    cashier: boolean;
    vet: boolean;
    reports: boolean;
    products: boolean;
    tutors: boolean;
    units: boolean;
    invoices: boolean;
    status: boolean;
}
