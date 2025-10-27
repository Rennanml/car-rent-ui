export interface CreateRentalRequest {
    licensePlate: string;
    cpf: string;
    startDate: string; 
    endDate: string;
    withInsurance: boolean;
}