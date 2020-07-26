import {UnityModel} from './unity.model';
import {TypeModel} from './type.model';

export interface BreedModel {
    id?: number;
    unity: UnityModel;
    type: TypeModel;
    description: string;
}
