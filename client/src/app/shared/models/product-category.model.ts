import { UnityModel } from './unity.model';

export interface ProductCategoryModel {
    id?: number;
    unity: UnityModel;
    description: string;
    status: boolean;
}
