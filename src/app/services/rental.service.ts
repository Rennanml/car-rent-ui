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
}
