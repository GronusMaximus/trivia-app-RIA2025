import { Component } from '@angular/core';
import { materialImports } from '../../../shared/material';
import { MatTableModule } from '@angular/material/table';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-game-results',
  standalone: true,
  imports: [materialImports, MatTableModule],
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent {
  displayedColumns = ['pregunta', 'correcta', 'respuesta'];
  constructor(public settings: SettingsService) { }
}
