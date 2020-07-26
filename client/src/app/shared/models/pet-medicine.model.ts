import {PetModel} from './pet.model';

export interface PetMedicineModel {
    id?: number;
    pet: PetModel;
    description: string;
    date: Date;
    validity: number;
}
