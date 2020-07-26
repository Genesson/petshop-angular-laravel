import {PetModel} from './pet.model';

export interface PetVaccineModel {
    id?: number;
    pet: PetModel;
    description: string;
    validity: string;
    date: Date;
}
