import { TimerComponent } from '../../../shared/components/ui/timer/timer.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { materialImports } from '../../../shared/material';
import { TriviaService } from '../../../core/services/trivia.service';
import { SettingsService } from '../../../core/services/settings.service';
import { QuestionCardComponent } from '../../../shared/components/ui/question-card/question-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { Question } from '../../../core/models/question.model';
import { stringify } from 'querystring';

@Component({
  selector: 'app-trivia-game',
  standalone: true,
  imports: [
    materialImports,
    QuestionCardComponent,
    TimerComponent, MatProgressSpinnerModule,
  ],
  templateUrl: './trivia-game.component.html',
  styleUrls: ['./trivia-game.component.css']
})
export class TriviaGameComponent implements OnInit {
  loading = true;
  current = 0;
  question?: Question;
  timerDuration = 30; // segundos

  constructor(
    private trivia: TriviaService,
    public settings: SettingsService, // <-- public para usar en el template
    private router: Router
  ) { }

    shuffleAnswers(options: string[]): string[] {
    return options
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }

ngOnInit() {
  console.log('[TriviaGameComponent] Iniciando juego...');
  console.log('Parámetros actuales:', {
    amount: this.settings.amount,
    categoryId: this.settings.categoryId,
    difficulty: this.settings.difficulty,
    type: this.settings.type
  });

  this.settings.resetGame();

  this.trivia.getToken().subscribe({
    next: (token: string) => {
      console.log('[TriviaGameComponent] Token obtenido:', token);

      this.trivia.getQuestions({
        amount: this.settings.amount,
        category: this.settings.categoryId || undefined,
        difficulty: this.settings.difficulty,
        type: this.settings.type,
        token
      }).subscribe({
        next: (qs: any[]) => {
          const preguntasConOpciones = qs.map(q => ({
            ...q,
            all_answers: this.shuffleAnswers([q.correct_answer, ...q.incorrect_answers])
          }));

          this.settings.questions = preguntasConOpciones;
          console.log('[TriviaGameComponent] Preguntas con respuestas mezcladas:', this.settings.questions);

          this.loading = false;
          this.setCurrentQuestion();
        },
        error: (err) => {
          console.error('[TriviaGameComponent] Error al obtener preguntas:', err);
        }
      });
    },
    error: (err) => {
      console.error('[TriviaGameComponent] Error al obtener token:', err);
    }
  });
}


  setCurrentQuestion() {
    this.question = this.settings.questions[this.current];
    console.log('[TriviaGameComponent] Pregunta actual:', this.question);
  }

  onAnswer(answer: string) {
    this.settings.userAnswers.push(answer);
    if (answer === this.question?.correct_answer) {
      this.settings.correctCount++;
    }
    if (this.current < this.settings.questions.length - 1) {
      this.current++;
      this.setCurrentQuestion();
    } else {
      this.settings.finished = true;
      this.router.navigate(['/results']);
    }
  }

  onTimerEnd() {
    this.settings.userAnswers.push('');
    if (this.current < this.settings.questions.length - 1) {
      this.current++;
      this.setCurrentQuestion();
    } else {
      this.settings.finished = true;
      this.router.navigate(['/results']);
    }
  }
}
