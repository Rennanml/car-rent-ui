import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RentalService } from '../../../services/rental.service';
import { CreateRentalRequest } from '../../../model/create.rental.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import 'moment/locale/pt-br';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-rental-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask(),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ],
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

  onSubmit(): void {
    const cleanRequest: CreateRentalRequest = { ...this.createRentalRequest };
    if (cleanRequest.cpf) {
      cleanRequest.cpf = cleanRequest.cpf.replace(/\D/g, ''); 
    }
    this.rentalService.createRental(cleanRequest).subscribe({
      next: () => {
        this.snackBar.open('Aluguel criado com sucesso!', 'Fechar', { duration: 3000 });
        this.router.navigate(['/rentals']);
      },
      error: (err: any) => this.snackBar.open('Erro ao criar aluguel. Verifique os dados.', 'Fechar', { duration: 3000 })
    });
  }

  cancel(): void {
    this.router.navigate(['/rentals']);
  }
}
