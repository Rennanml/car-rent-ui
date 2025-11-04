export interface PeriodRental {
    startDate: string;
    endDate: string;
    days: number;
}

export interface CostumerRental {
    name: string;
    cpf: string;
}
export interface CarRental {
    licensePlate: string;
    brand: string;
    model: string;
    basePrice: number;
}
export interface Rental {
    id: number;
    customer: CostumerRental; 
    car: CarRental;           
    period: PeriodRental;     
    totalPrice: number;
    status: string;
    actualReturnDate: string | null; 
    finalPrice: number | null;     
}