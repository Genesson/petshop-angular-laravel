import {ServiceModel} from './service.model';

export interface PackageModel {
    id?: number;
    name: string;
    service: ServiceModel;
    days: number;
    price: number;
    promotional_days: string;
    promotional_price: string;
    promotional_percent: string;
    toast_before: number;
    toast_name: string;
    package_until: string;
    status: boolean;
}
