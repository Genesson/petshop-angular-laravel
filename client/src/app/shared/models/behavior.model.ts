import {UnityModel} from './unity.model';

export interface BehaviorModel {
    id?: number;
    unity: UnityModel;
    description: string;
}
