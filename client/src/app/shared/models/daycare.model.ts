export interface DaycareModel {
    id?: number;
    pet: number;
    schedule: number;
    action: string;
    presence: string;
    presence_date: Date;
    first_meat: string;
    first_meat_date: Date;
    second_meat: string;
    second_meat_date: Date;
    peed: boolean;
    peed_date: Date;
    pooped: boolean;
    pooped_date: Date;
    observation: string;
    observation_date: Date;
    status: boolean;
}
