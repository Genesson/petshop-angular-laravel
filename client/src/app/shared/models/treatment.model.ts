export interface TreatmentModel {
    id?: number;
    consultation: number;
    remedy_name: string;
    number_of_days: number;
    use_type: string;
    times_day: number;
    amount: number;
    unity_type: string;
    observations: string;
    status: boolean;
}
