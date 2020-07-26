export interface CategoryModel {
    id?: number;
    unity: number;
    order: number;
    description: string;
    module: string;
    services: object;
    package: boolean;
    status: boolean;
}
