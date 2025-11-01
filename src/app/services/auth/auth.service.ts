import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, fromEvent, merge, Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/v1';
  private readonly TOKEN_KEY = 'authToken';
  private readonly INACTIVITY_TIME_MS = 15 * 60 * 1000;

  private http = inject(HttpClient);
  private router = inject(Router);

  private userLoggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());
  userLoggedIn$ = this.userLoggedIn.asObservable();

  private inactivityTimer: any;
  private userActivity$: Observable<Event>;
  private activitySubscription?: Subscription;

  constructor() {
    this.userActivity$ = merge(
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'click'),
      fromEvent(window, 'keydown')
    );

    this.userLoggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.startInactivityTimer();
      } else {
        this.stopInactivityTimer();
      }
    });
  }

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
    if (!token) {
      return false;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const isExpired = decodedToken.exp * 1000 < Date.now();

      if (isExpired) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.userLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  private startInactivityTimer(): void {
    this.stopInactivityTimer(); 
    this.activitySubscription = this.userActivity$.subscribe(() => {
      this.resetInactivityTimer();
    });
    this.resetInactivityTimer();
  }

  private resetInactivityTimer(): void {
    clearTimeout(this.inactivityTimer);
    this.inactivityTimer = setTimeout(() => {
      this.logout();
    }, this.INACTIVITY_TIME_MS);
  }

  private stopInactivityTimer(): void {
    clearTimeout(this.inactivityTimer);
    this.activitySubscription?.unsubscribe();
  }
}