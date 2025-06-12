import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { materialImports } from '../../../shared/material';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-game-setup',
  standalone: true,
  imports: [materialImports, FormsModule, ReactiveFormsModule],
  templateUrl: './game-setup.component.html',
  styleUrls: ['./game-setup.component.css']
})
export class GameSetupComponent {
  setupForm: FormGroup;

  difficulties = [
    { label: 'Fácil', value: 'easy' },
    { label: 'Media', value: 'medium' },
    { label: 'Difícil', value: 'hard' }
  ];

  types = [
    { label: 'Opción múltiple', value: 'multiple' },
    { label: 'Verdadero/Falso', value: 'boolean' }
  ];

  constructor(
    private fb: FormBuilder,
    private settings: SettingsService,
    private router: Router
  ) {
    // Inicializa el formulario con los valores actuales de SettingsService o valores por defecto
    this.setupForm = this.fb.group({
      difficulty: [this.settings.difficulty],
      type: [this.settings.type],
      amount: [this.settings.amount]
    });
  }

  onSubmit() {
    if (this.setupForm.valid) {
      const { difficulty, type, amount } = this.setupForm.value;
      this.settings.difficulty = difficulty;
      this.settings.type = type;
      this.settings.amount = amount;
      this.router.navigate(['/play']);
    }
  }
}
