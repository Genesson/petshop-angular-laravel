export interface PayableModel {
    id?: number;
    quota: string;
    value: number;
    expiration: string;
    payment_at: string;
}
