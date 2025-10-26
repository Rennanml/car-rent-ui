import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CostumerService } from '../../../services/costumer.service';
import { Costumer } from '../../../model/costumer.model';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-costumer-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './costumer-form.component.html',
  styleUrls: ['./costumer-form.component.css'],
})
export class CostumerFormComponent implements OnInit {
  costumer: Costumer = {
    cpf: '',
    name: '',
  };
  isEditMode: boolean = false;
  private costumerCpf: string | null = null;

  private costumerService = inject(CostumerService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const cpfParam = params.get('cpf');
      if (cpfParam) {
        this.costumerCpf = cpfParam;
        this.isEditMode = true;
        this.loadCostumer(this.costumerCpf);
      }
    });
  }

  loadCostumer(cpf: string): void {
    this.costumerService.getCostumerByCpf(cpf).subscribe({
      next: (data) => {
        this.costumer = data;
      },
      error: (err) => {
        this.snackBar.open('Erro ao carregar cliente.', 'Fechar', {
          duration: 3000,
        });
        this.router.navigate(['/customers']);
      },
    });
  }

  onSubmit(): void {
    {
    if (this.isEditMode) {
      this.costumerService.updateCostumer(this.costumerCpf!, this.costumer).subscribe({
        next: () => {
          this.snackBar.open('Carro atualizado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/customers']);
        },
        error: (err) => this.snackBar.open('Erro ao atualizar carro.', 'Fechar', { duration: 3000 })
      });
    } else {
      this.costumerService.createCostumer(this.costumer).subscribe({
        next: () => {
          this.snackBar.open('Carro criado com sucesso!', 'Fechar', { duration: 3000 });
          this.router.navigate(['/customers']);
        },
        error: (err) => this.snackBar.open('Erro ao criar carro.', 'Fechar', { duration: 3000 })
      });
    }
  }
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}
