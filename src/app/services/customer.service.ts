import { HttpClient } from '@angular/common/http';  
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../model/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly API_URL = 'http://localhost:8080/api/v1/customers';

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {  
    return this.http.get<Customer[]>(this.API_URL);
  } 

  getCustomerByCpf(cpf: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.API_URL}/${cpf}`);
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.API_URL, customer);
  }

  updateCustomer(cpf: string, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.API_URL}/${cpf}`, customer);
  } 
  
  deleteCustomer(cpf: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${cpf}`);
  }
}
