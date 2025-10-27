import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../services/customer.service';
import { Customer } from '../../../model/customer.model';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule
  ],
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})

export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  displayedColumns: string[] = ['name', 'cpf', 'actions'];

  private customerService = inject(CustomerService);
  private router = inject(Router) ;   
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadCustomers();
  } 

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (err) => this.snackBar.open('Erro ao carregar clientes.', 'Fechar', { duration: 3000 })
    });
  }

  editCustomer(cpf: string): void {
    this.router.navigate(['/customers/edit', cpf]);
  }
  
  deleteCustomer(cpf: string): void {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.customerService.deleteCustomer(cpf).subscribe({
        next: () => {
          this.snackBar.open('Cliente excluído com sucesso!', 'Fechar', { duration: 3000 });
          this.loadCustomers();
        },
        error: (err) => this.snackBar.open('Erro ao excluir cliente.', 'Fechar', { duration: 3000 })
      });
    }   
  }

  addCustomer(): void {
    this.router.navigate(['/customers/new']);
  } 
}
