import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../../services/customer.service';
import { Customer as Customer } from '../../../model/customer.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = {
    cpf: '',
    name: '',
  };
  isEditMode: boolean = false;
  private customerCpf: string | null = null;

  private customerService = inject(CustomerService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const cpfParam = params.get('cpf');
      if (cpfParam) {
        this.customerCpf = cpfParam;
        this.isEditMode = true;
        this.loadCustomer(this.customerCpf);
      }
    });
  }

  loadCustomer(cpf: string): void {
    this.customerService.getCustomerByCpf(cpf).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (err) => {
        this.router.navigate(['/customers']);
      }
    });
  }

  onSubmit(): void {
    {
    if (this.isEditMode) {
      this.customerService.updateCustomer(this.customerCpf!, this.customer).subscribe({
        next: () => {
          this.snackBar.open('Cliente atualizado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/customers']);
        }
      });
    } else {
      this.customerService.createCustomer(this.customer).subscribe({
        next: () => {
          this.snackBar.open('Cliente criado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/customers']);
        }
      });
    }
  }
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}
