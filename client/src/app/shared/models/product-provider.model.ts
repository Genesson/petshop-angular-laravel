import { UnityModel } from './unity.model';

export interface ProductProviderModel {
    id?: number;
    unity: UnityModel;
    description: string;
    status: boolean;
}
