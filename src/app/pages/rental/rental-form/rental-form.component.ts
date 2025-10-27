import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RentalService } from '../../../services/rental.service';
import { CreateRentalRequest } from '../../../model/create.rental.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-rental-form',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule],
  templateUrl: './rental-form.component.html',
  styleUrl: './rental-form.component.css'
})
export class RentalFormComponent {
  createRentalRequest: CreateRentalRequest = {
    licensePlate: '',
    cpf: '',
    startDate: '',
    endDate: '',
    withInsurance: false
  };

  private rentalService = inject(RentalService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  public minStartDate: Date = new Date();

  onSubmit(): void {{
      this.rentalService.createRental(this.createRentalRequest).subscribe({
        next: () => {
          this.snackBar.open('Aluguel criado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/rentals']);
        },
        error: (err) => this.snackBar.open('Erro ao criar aluguel.', 'Fechar', { duration: 3000 })
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/rentals']);
  }
}
