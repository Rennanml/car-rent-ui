import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReturnService } from '../../../services/return.service';
import { Return } from '../../../model/return.model';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNgxMask } from 'ngx-mask';

import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

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
  selector: 'app-rental-return',
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
  templateUrl: './rental-return.component.html',
  styleUrl: './rental-return.component.css'
})
export class RentalReturnComponent implements OnInit {

  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private returnService = inject(ReturnService);
  private snackBar = inject(MatSnackBar); 

  rentalId!: number;
  
  returnModel: Omit<Return, 'actualReturnDate'> & { actualReturnDate: Date | null } = {
    rentalId: 0,
    actualReturnDate: null, 
    needsMaintenance: false,
    needsCleaning: false
  };

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const idParam = params.get('rentalId');
      this.rentalId = idParam ? +idParam : 0;

      if (this.rentalId) {
        this.returnModel.rentalId = this.rentalId;
      } else {
        this.snackBar.open('ID do aluguel não encontrado na rota.', 'Erro', { duration: 5000 });
        this.router.navigate(['/rentals']); 
      }
    });
  }

  onSubmit(form: any): void {
    if (form.invalid || !this.returnModel.actualReturnDate) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Atenção', { duration: 3000 });
      return;
    }

    const finalReturnModel: Return = {
        rentalId: this.returnModel.rentalId,
        needsMaintenance: this.returnModel.needsMaintenance,
        needsCleaning: this.returnModel.needsCleaning,
        actualReturnDate: (this.returnModel.actualReturnDate as Date).toISOString()
    };

    this.returnService.createReturn(finalReturnModel).subscribe({
      next: () => {
        this.snackBar.open(`Devolução do aluguel #${this.rentalId} registrada com sucesso!`, 'Sucesso', { duration: 5000 });
        this.router.navigate(['/rentals']);
      },
      error: (error) => {
        console.error('Erro ao registrar devolução:', error);
        this.snackBar.open('Erro ao registrar devolução. Tente novamente.', 'Erro', { duration: 7000 });
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/rentals']);
  }
}
