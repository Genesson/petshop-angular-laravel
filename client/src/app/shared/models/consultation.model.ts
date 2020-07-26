import {PetModel} from './pet.model';
import {UserModel} from './user.model';

export interface ConsultationModel {
    id?: number;
    pet: PetModel;
    tutor: UserModel;
    current_weight: number;
    temperature: number;
    anamnesis: string;
    diagnosis: string;
    exams: string;
    status: boolean;
    created_at: Date;
}
