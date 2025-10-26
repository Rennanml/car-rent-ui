import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../model/rental.model';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  private readonly API_URL = 'http://localhost:8080/api/v1/rentals';

  constructor(private http: HttpClient) { }

  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.API_URL);
  }

  getRentalById(id: number): Observable<Rental> {
    return this.http.get<Rental>(`${this.API_URL}/${id}`);
  }

  createRental(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>(this.API_URL, rental);
  }

  updateRental(id: number, rental: Rental): Observable<Rental> {
    return this.http.put<Rental>(`${this.API_URL}/${id}`, rental);
  }

  deleteRental(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
