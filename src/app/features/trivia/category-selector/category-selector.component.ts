import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TriviaService } from '../../../core/services/trivia.service';
import { SettingsService } from '../../../core/services/settings.service';
import { materialImports } from '../../../shared/material';
import { CategoryResponse } from '../../../core/models/category-response.model';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [materialImports],
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  categories: { id: number; name: string }[] = [];
  selectedCategoryId: number | null = null;

  loading = true;
  errorMessage: string | null = null;

  constructor(
    private triviaService: TriviaService,
    private settings: SettingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.errorMessage = null;

    this.triviaService.getCategories().subscribe({
      next: (response: CategoryResponse) => {
        this.categories = response.trivia_categories.map(c => ({ id: c.id, name: c.name }));
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'No se pudieron cargar las categorías.';
        this.loading = false;
      }
    });
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    this.settings.categoryId = id;
    this.router.navigate(['/config']);
  }

  getCategoryIcon(name: string): string {
    const icons: { [key: string]: string } = {
      'General Knowledge': '📚',
      'Entertainment: Books': '📖',
      'Entertainment: Film': '🎬',
      'Entertainment: Music': '🎵',
      'Entertainment: Video Games': '🎮',
      'Entertainment: Board Games': '🎲',
      'Science & Nature': '🔬',
      'Science: Computers': '💻',
      'Science: Mathematics': '➗',
      'Mythology': '🏛️',
      'Sports': '🏃‍♂️',
      'Geography': '🌍',
      'History': '📜',
      'Politics': '🏛️',
      'Art': '🎨',
      'Celebrities': '🌟',
      'Animals': '🐾',
      'Vehicles': '🚗',
      'Comics': '🦸‍♂️',
      'Gadgets': '📱',
      'Anime & Manga': '🧧',
      'Cartoon & Animations': '🎭'
    };
    return icons[name] || '❓';
  }

  getCategoryDescription(name: string): string {
    return `Preguntas sobre ${name}`;
  }
}
