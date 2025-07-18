import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Question } from '../models/question.model';
import { CategoryResponse } from '../models/category-response.model';

@Injectable({ providedIn: 'root' })
export class TriviaService {
  private api = 'https://opentdb.com';

  constructor(private http: HttpClient) { }

  getToken(): Observable<string> {
    return this.http
      .get<{ token: string }>(`${this.api}/api_token.php?command=request`)
      .pipe(
        map(r => r.token),
        catchError(err => throwError(() => new Error('Error al obtener el token.')))
      );
  }

  getQuestions(params: {
    amount: number;
    category?: number;
    difficulty?: string;
    type?: string;
    token?: string;
  }): Observable<Question[]> {
    let query = `amount=${params.amount}`;
    if (params.category) query += `&category=${params.category}`;
    if (params.difficulty) query += `&difficulty=${params.difficulty}`;
    if (params.type) query += `&type=${params.type}`;
    if (params.token) query += `&token=${params.token}`;
    return this.http.get<{ results: any[] }>(`${this.api}/api.php?${query}`).pipe(
      map(res =>
        res.results.map(q => ({
          ...q,
          all_answers: shuffle([q.correct_answer, ...q.incorrect_answers])
        }))
      ),
      catchError(() => throwError(() => new Error('Error al cargar las preguntas.')))
    );
  }

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.api}/api_category.php`).pipe(
      catchError(() => throwError(() => new Error('Error al cargar las categorías.')))
    );
  }
}

function shuffle<T>(array: T[]): T[] {
  return array
    .map(a => [Math.random(), a] as [number, T])
    .sort((a, b) => a[0] - b[0])
    .map(a => a[1]);
}
