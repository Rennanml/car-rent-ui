import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,     
  imports: [
    CommonModule,
    RouterLink, 
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  private authService = inject(AuthService);
  isLoggedIn$: Observable<boolean> = this.authService.userLoggedIn$;

  links = [
    { path: '/cars', label: 'Carros' },
    { path: '/rentals', label: 'Aluguéis' },
    { path: '/customers', label: 'Clientes' }
  ];

  onLogout(): void {
    this.authService.logout();
  }
}