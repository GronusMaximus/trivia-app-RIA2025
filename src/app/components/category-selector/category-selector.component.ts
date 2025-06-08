import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para *ngIf y *ngFor
import { TriviaService } from '../../services/trivia.service';

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  categories: { id: number, name: string }[] = [];
  selectedCategoryId: number | null = null;

  constructor(private triviaService: TriviaService) {}

  ngOnInit(): void {
    this.triviaService.getCategories().subscribe(response => {
      this.categories = response.trivia_categories;
    });
  }

  selectCategory(id: number) {
    this.selectedCategoryId = id;
    console.log(`Categoría seleccionada: ${id}`);
    // Más adelante podrías guardar esta selección o navegar
  }
}
