import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'costumers',
    loadComponent: () => import('./pages/costumer/costumer-list/costumer-list.component')
                       .then(m => m.CostumerListComponent)
  },
  {
    path: 'costumers/new',
    loadComponent: () => import('./pages/costumer/costumer-form/costumer-form.component')
                       .then(m => m.CostumerFormComponent)
  },
  {
    path: 'costumers/edit/:cpf',
    loadComponent: () => import('./pages/costumer/costumer-form/costumer-form.component')
                       .then(m => m.CostumerFormComponent)
  },
  {
    path: 'cars',
    loadComponent: () => import('./pages/car/car-list/car-list.component')
                       .then(m => m.CarListComponent)
  },
  {
    path: 'cars/new',
    loadComponent: () => import('./pages/car/car-form/car-form.component')
                       .then(m => m.CarFormComponent)
  },
  {
    path: 'cars/edit/:licensePlate',
    loadComponent: () => import('./pages/car/car-form/car-form.component')
                       .then(m => m.CarFormComponent)
  },

  {
    path: 'rentals',
    loadComponent: () => import('./pages/rental/rental-list/rental-list.component')
                       .then(m => m.RentalListComponent)
  },
  {
    path: 'rentals/new',
    loadComponent: () => import('./pages/rental/rental-form/rental-form.component')
                       .then(m => m.RentalFormComponent)
  },
  
  { path: '', redirectTo: '/rentals', pathMatch: 'full' }
];
