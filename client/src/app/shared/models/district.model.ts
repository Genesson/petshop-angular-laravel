import {UnityModel} from './unity.model';
import {RegionModel} from './region.model';

export interface DistrictModel {
    id?: number;
    unity: UnityModel;
    region: RegionModel;
    description: string;
    status: string;
}
