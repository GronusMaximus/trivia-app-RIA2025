import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '../../../core/services/trivia.service';
import { SettingsService } from '../../../core/services/settings.service';
import { materialImports } from '../../../shared/material';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [materialImports],
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  categories: { id: number, name: string }[] = [];
  selectedCategoryId: number | null = null;

  constructor(
    private triviaService: TriviaService,
    private settings: SettingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.triviaService.getCategories().subscribe(response => {
      this.categories = response.trivia_categories;
    });
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    this.settings.categoryId = id;         // Guarda la selección globalmente
    this.router.navigate(['/config']);     // Navega a la pantalla de configuración
  }
}
