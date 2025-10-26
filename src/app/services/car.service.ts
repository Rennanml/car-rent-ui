import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../model/car.model';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  private readonly API_URL = 'http://localhost:8080/api/v1/cars';

  constructor(private http: HttpClient) { }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.API_URL);
  }

  getCarByLicensePlate(licensePlate: string): Observable<Car> {
    return this.http.get<Car>(`${this.API_URL}/${licensePlate}`);
  }

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.API_URL, car);
  }

  updateCar(licensePlate: string, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.API_URL}/${licensePlate}`, car);
  }

  deleteCar(licensePlate: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${licensePlate}`);
  }
}