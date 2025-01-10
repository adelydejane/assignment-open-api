import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private readonly apiUrl = 'https://gnews.io/api/v4/top-headlines';
  private readonly apiKey = '2d504ef974176296de39be6496a611e2';

  constructor(private readonly httpService: HttpService) {}

  getTopHeadlines(query: any): Observable<any> {
    const params = {
      apiKey: this.apiKey,
      language: 'en',
      country: query.country || 'ph', // Default to 'ph' if not provided
    };

    return this.httpService
      .get(this.apiUrl, { params })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error(error);
          throw new Error('Failed to fetch news');
        })
      );
  }
}
