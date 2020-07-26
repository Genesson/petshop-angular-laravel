import {TypeModel} from './type.model';
import {UnityModel} from './unity.model';

export interface TypeFurModel {
    id?: number;
    unity: UnityModel;
    type: TypeModel;
    description: string;
}
