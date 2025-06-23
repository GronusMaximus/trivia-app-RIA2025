import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SettingsService } from '../../../core/services/settings.service';

@Component({
  selector: 'app-game-results',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule
  ],
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.css']
})
export class GameResultsComponent implements OnInit {
  displayedColumns: string[] = ['pregunta', 'correcta', 'respuesta'];

  constructor(public settings: SettingsService) { }

  ngOnInit(): void { }
}
