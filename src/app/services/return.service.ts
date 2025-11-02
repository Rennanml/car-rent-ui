import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Return } from '../model/return.model';

@Injectable({
  providedIn: 'root'
})
export class ReturnService {
  private readonly API_URL = 'http://localhost:8080/api/v1/returns'; 

  constructor(private http: HttpClient) { }

  createReturn(returnModel: Return): Observable<Return> {
    return this.http.post<Return>(this.API_URL, returnModel);
  }

}