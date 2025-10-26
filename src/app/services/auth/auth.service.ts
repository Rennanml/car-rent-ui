import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/v1';
  private readonly TOKEN_KEY = 'authToken';

  private http = inject(HttpClient);
  private router = inject(Router);

  private userLoggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  userLoggedIn$ = this.userLoggedIn.asObservable();

  constructor() { }

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/authenticate`, credentials).pipe(
      tap(response => {
        this.saveToken(response.token);
        this.userLoggedIn.next(true);
      })
    );
  }

  register(userInfo: any): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userInfo);
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token; 
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userLoggedIn.next(false);
    this.router.navigate(['/login']);
  }
}