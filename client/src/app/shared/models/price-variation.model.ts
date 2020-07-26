import {UnityModel} from './unity.model';
import { CategoryModel } from './category.model';

export interface PriceVariationModel {
    id?: number;
    unity: UnityModel;
    description: string;
    start: string;
    end: string;
    value: number;
    percent: number;
    module: string;
    moduleObj: CategoryModel;
    status: boolean;
}
