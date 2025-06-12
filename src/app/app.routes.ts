// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { CategorySelectorComponent } from './features/trivia/category-selector/category-selector.component';
import { GameSetupComponent } from './features/trivia/game-setup/game-setup.component';
import { TriviaGameComponent } from './features/trivia/trivia-game/trivia-game.component';
import { GameResultsComponent } from './features/trivia/game-results/game-results.component';

export const routes: Routes = [
    { path: '', component: CategorySelectorComponent },
    { path: 'config', component: GameSetupComponent },
    { path: 'play', component: TriviaGameComponent },
    { path: 'results', component: GameResultsComponent },
    { path: '**', redirectTo: '' }
];
