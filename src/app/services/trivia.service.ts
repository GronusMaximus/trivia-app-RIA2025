import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CategoryResponse {
  trivia_categories: { id: number, name: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class TriviaService {

  private baseUrl = 'https://opentdb.com';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.baseUrl}/api_category.php`);
  }
}
