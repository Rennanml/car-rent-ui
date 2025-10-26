import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CostumerService } from '../../../services/costumer.service';
import { Costumer } from '../../../model/costumer.model';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-costumer-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './costumer-list.component.html',
  styleUrls: ['./costumer-list.component.css']
})

export class CostumerListComponent implements OnInit {
  costumers: Costumer[] = [];

  displayedColumns: string[] = ['name', 'cpf', 'actions'];

  private costumerService = inject(CostumerService);
  private router = inject(Router) ;   
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadCostumers();
  } 

  loadCostumers(): void {
    this.costumerService.getCostumers().subscribe({
      next: (data) => this.costumers = data,
      error: (err) => this.snackBar.open('Erro ao carregar clientes.', 'Fechar', { duration: 3000 })
    });
  }

  editCostumer(cpf: string): void {
    this.router.navigate(['/customers/edit', cpf]);
  }
  
  deleteCostumer(cpf: string): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.costumerService.deleteCostumer(cpf).subscribe({
        next: () => {
          this.snackBar.open('Cliente excluído com sucesso!', 'Fechar', { duration: 3000 });
          this.loadCostumers();
        },
        error: (err) => this.snackBar.open('Erro ao excluir cliente.', 'Fechar', { duration: 3000 })
      });
    }   
  }

  addCostumer(): void {
    this.router.navigate(['/customers/new']);
  } 
}
