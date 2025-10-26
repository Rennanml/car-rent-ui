import { HttpClient } from '@angular/common/http';  
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Costumer } from '../model/costumer.model';

@Injectable({
  providedIn: 'root'
})
export class CostumerService {
  private readonly API_URL = 'http://localhost:8080/api/v1/costumers';

  constructor(private http: HttpClient) { }

  getCostumers(): Observable<Costumer[]> {  
    return this.http.get<Costumer[]>(this.API_URL);
  } 

  getCostumerByCpf(cpf: string): Observable<Costumer> {
    return this.http.get<Costumer>(`${this.API_URL}/${cpf}`);
  }

  createCostumer(costumer: Costumer): Observable<Costumer> {
    return this.http.post<Costumer>(this.API_URL, costumer);
  }

  updateCostumer(cpf: string, costumer: Costumer): Observable<Costumer> {
    return this.http.put<Costumer>(`${this.API_URL}/${cpf}`, costumer);
  } 
  
  deleteCostumer(cpf: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${cpf}`);
  }
}
