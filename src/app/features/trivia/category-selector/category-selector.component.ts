import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
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

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.errorMessage = null;

    try {
      const response = await lastValueFrom(this.triviaService.getCategories());
      this.categories = response.trivia_categories.map(c => ({ id: c.id, name: c.name }));
    } catch (err) {
      console.error(err);
      this.errorMessage = 'No se pudieron cargar las categorías.';
    } finally {
      this.loading = false;
    }
  }

  selectCategory(id: number): void {
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
