import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../model/car.model';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {
  cars: Car[] = [];
  
  displayedColumns: string[] = ['licensePlate', 'brand', 'model', 'basePrice', 'actions'];

  private carService = inject(CarService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (data) => this.cars = data,
      error: (err) => this.snackBar.open('Erro ao carregar carros.', 'Fechar', { duration: 3000 })
    });
  }

  editCar(licensePlate: string): void {
    this.router.navigate(['/cars/edit', licensePlate]);
  }

  deleteCar(licensePlate: string): void {
    if (confirm('Tem certeza que deseja excluir este carro?')) {
      this.carService.deleteCar(licensePlate).subscribe({
        next: () => {
          this.snackBar.open('Carro excluído com sucesso!', 'Fechar', { duration: 3000 });
          this.loadCars();
        },
        error: (err) => this.snackBar.open('Erro ao excluir carro.', 'Fechar', { duration: 3000 })
      });
    }
  }

  addCar(): void {
    this.router.navigate(['/cars/new']);
  }
}