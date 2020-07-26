import {PetModel} from './pet.model';

export interface EvaluationModel {
    id?: number;
    pet: PetModel;
    first_date: string;
    description: string;
    liked_pool: string;
    pool_obs: string;
    hydration: string;
    hydration_obs: string;
    pee_poop: string;
    behavior: string;
    frequency: string;
    reason: boolean;
    test: boolean;
}
