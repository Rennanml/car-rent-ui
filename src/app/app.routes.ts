import { Routes } from '@angular/router';
import { authGuard } from './services/auth/auth.guard';

export const routes: Routes = [
  // Auth Routes
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login.component')
                       .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register.component')
                       .then(m => m.RegisterComponent)
  },

  // --- Protected Routes ---
  // Costumer Routes
  {
    path: 'costumers',
    loadComponent: () => import('./pages/costumer/costumer-list/costumer-list.component')
                       .then(m => m.CostumerListComponent),
                       canActivate: [authGuard]
  },
  {
    path: 'costumers/new',
    loadComponent: () => import('./pages/costumer/costumer-form/costumer-form.component')
                       .then(m => m.CostumerFormComponent),
                        canActivate: [authGuard]
  },
  {
    path: 'costumers/edit/:cpf',
    loadComponent: () => import('./pages/costumer/costumer-form/costumer-form.component')
                       .then(m => m.CostumerFormComponent),
                        canActivate: [authGuard]
  },

  // Car Routes
  {
    path: 'cars',
    loadComponent: () => import('./pages/car/car-list/car-list.component')
                       .then(m => m.CarListComponent),
                        canActivate: [authGuard]
  },
  {
    path: 'cars/new',
    loadComponent: () => import('./pages/car/car-form/car-form.component')
                       .then(m => m.CarFormComponent),
                        canActivate: [authGuard]
  },
  {
    path: 'cars/edit/:licensePlate',
    loadComponent: () => import('./pages/car/car-form/car-form.component')
                       .then(m => m.CarFormComponent),
                        canActivate: [authGuard]
  },

  // Rental Routes
  {
    path: 'rentals',
    loadComponent: () => import('./pages/rental/rental-list/rental-list.component')
                       .then(m => m.RentalListComponent),
                        canActivate: [authGuard]
  },
  {
    path: 'rentals/new',
    loadComponent: () => import('./pages/rental/rental-form/rental-form.component')
                       .then(m => m.RentalFormComponent),
                        canActivate: [authGuard]
  },
  
  { path: '', redirectTo: '/rentals', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
