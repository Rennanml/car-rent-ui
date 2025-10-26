import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CarService } from '../../../services/car.service';
import { Car } from '../../../model/car.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-car-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {
  car: Car = {
    licensePlate: '',
    brand: '',
    model: '',
    basePrice: 0
  };
  isEditMode: boolean = false;
  private carLicensePlate: string | null = null;

  private carService = inject(CarService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const plateParam = params.get('licensePlate');
      if (plateParam) {
        this.carLicensePlate = plateParam;
        this.isEditMode = true;
        this.loadCar(this.carLicensePlate);
      }
    });
  }

  loadCar(licensePlate: string): void {
    this.carService.getCarByLicensePlate(licensePlate).subscribe({
      next: (data) => {
        this.car = data;
      },
      error: (err) => {
        this.snackBar.open('Erro ao carregar carro.', 'Fechar', { duration: 3000 });
        this.router.navigate(['/cars']);
      }
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.carService.updateCar(this.carLicensePlate!, this.car).subscribe({
        next: () => {
          this.snackBar.open('Carro atualizado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/cars']);
        },
        error: (err) => this.snackBar.open('Erro ao atualizar carro.', 'Fechar', { duration: 3000 })
      });
    } else {
      this.carService.createCar(this.car).subscribe({
        next: () => {
          this.snackBar.open('Carro criado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/cars']);
        },
        error: (err) => this.snackBar.open('Erro ao criar carro.', 'Fechar', { duration: 3000 })
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/cars']);
  }
}