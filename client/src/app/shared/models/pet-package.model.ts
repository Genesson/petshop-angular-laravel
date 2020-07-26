import {PetModel} from './pet.model';
import {ServiceModel} from './service.model';
import {PackageModel} from './package.model';

export interface PetPackageModel {
    id?: number;
    pet: PetModel;
    package: PackageModel;
    service: ServiceModel;
    quantity_days: number;
    interval_days: number;
    weekdays: boolean;
    with_month: boolean;
    start_date: Date;
    week_days: string;
    intervals: string;
    quantity: number;
    status: boolean;
}
