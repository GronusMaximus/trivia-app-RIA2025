import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CategorySelectorComponent } from './features/trivia/category-selector/category-selector.component';
import { AppHeaderComponent } from './shared/components/app-header/app-header.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CategorySelectorComponent, AppHeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  protected title = 'trivia-app';
}
