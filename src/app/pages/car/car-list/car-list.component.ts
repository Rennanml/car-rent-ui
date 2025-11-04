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

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-car-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule
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
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getCars().subscribe({
      next: (data) => this.cars = data
    });
  }

  editCar(licensePlate: string): void {
    this.router.navigate(['/cars/edit', licensePlate]);
  }

  deleteCar(licensePlate: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: { 
        title: 'Confirmar Exclusão', 
        message: `Tem certeza que deseja excluir o carro com placa ${licensePlate}?` 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.carService.deleteCar(licensePlate).subscribe({
          next: () => {
            this.snackBar.open('Carro excluído com sucesso!', 'Fechar', { duration: 3000 });
            this.loadCars();
          }
        });
      }
    });
  }

  addCar(): void {
    this.router.navigate(['/cars/new']);
  }
}