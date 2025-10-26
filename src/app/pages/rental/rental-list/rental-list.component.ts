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

@Component({
  selector: 'app-rental-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './rental-list.component.html',
  styleUrl: './rental-list.component.css'
})
export class RentalListComponent implements OnInit {
  rentals: Rental[] = [];
  
  displayedColumns: string[] = ['id' , 'costumer', 'car', 'startDate', 'endDate', 'totalPrice', 'status', 'actualReturnDate', 'finalPrice'];

  private rentalService = inject(RentalService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadRentals();
  }

  loadRentals(): void {
    this.rentalService.getRentals().subscribe({
      next: (data) => this.rentals = data,
      error: (err) => this.snackBar.open('Erro ao carregar alugueis.', 'Fechar', { duration: 3000 })
    });
  }

  editRental(id: number): void {
    this.router.navigate(['/rental/edit', id]);
  }

  deleteRental(id: number): void {
    if (confirm('Tem certeza que deseja excluir este aluguel?')) {
      this.rentalService.deleteRental(id).subscribe({
        next: () => {
          this.snackBar.open('Aluguel excluído com sucesso!', 'Fechar', { duration: 3000 });
          this.loadRentals();
        },
        error: (err) => this.snackBar.open('Erro ao excluir aluguel.', 'Fechar', { duration: 3000 })
      });
    }
  }

  addRental(): void {
    this.router.navigate(['/rental/new']);
  }

}
