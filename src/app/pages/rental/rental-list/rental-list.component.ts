import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RentalService } from '../../../services/rental.service';
import { Rental, CostumerRental, CarRental, PeriodRental } from '../../../model/rental.model';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-rental-list',
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
  templateUrl: './rental-list.component.html',
  styleUrls: ['./rental-list.component.css']
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];
  
  displayedColumns: string[] = [
    'id' , 
    'costumer', 
    'car', 
    'startDate', 
    'endDate', 
    'totalPrice', 
    'status', 
    'actualReturnDate', 
    'finalPrice', 
    'actions'
  ];

  private rentalService = inject(RentalService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  getFriendlyStatus(status: 'ACTIVE' | 'FINISHED' | 'CANCELED'): string {
    switch (status) {
      case 'ACTIVE':
        return 'Ativo';
      case 'FINISHED':
        return 'Finalizado';
      case 'CANCELED':
        return 'Cancelado';
    }
  }

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getRentals().subscribe({
      next: (data) => this.rentals = data,
      error: (err) => this.snackBar.open('Erro ao carregar alugueis.', 'Fechar', { duration: 3000 })
    });
  }

  deleteRental(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: { 
        title: 'Confirmar Exclusão', 
        message: `Tem certeza que deseja excluir o aluguel nº ${id}?` 
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.rentalService.deleteRental(id).subscribe({
          next: () => {
            this.snackBar.open('Aluguel excluído com sucesso!', 'Fechar', { duration: 3000 });
            this.loadRentals();
          },
          error: (err) => this.snackBar.open('Erro ao excluir aluguel.', 'Fechar', { duration: 3000 })
        });
      }
    });
  }

  addRental(): void {
    this.router.navigate(['/rentals/new']);
  }

  returnRental(id: number): void {
    this.router.navigate(['/rentals/return', id]);
  }

}