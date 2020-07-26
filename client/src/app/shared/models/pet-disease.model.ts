import {PetModel} from './pet.model';

export interface PetDiseaseModel {
    id?: number;
    pet: PetModel;
    description: string;
}
