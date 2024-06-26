import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org';
  private jsonUrl = 'assets/collection.json';
  constructor(private http: HttpClient) { }

  getList(category: string, list: string, page: number) {
    const optionsGet = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmY5YmFkNmVkNWM3MmU2MGU3YjAzNGE3ZWMyYjdhMyIsInN1YiI6IjY2MjI1OGZhZTY0MGQ2MDE2M2MzODc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sn8k6hZE8fkqHpnIZ38vltqBs9B7AcSdhl4HaKp0NuA'
      }
    };
    return this.http
      .get<any>(`${this.apiUrl}/3/${category}/${list}?page=${page}`,
        optionsGet
      )
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  search(keyword: string, page: number): Observable<any> {
    const optionsGet = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmY5YmFkNmVkNWM3MmU2MGU3YjAzNGE3ZWMyYjdhMyIsInN1YiI6IjY2MjI1OGZhZTY0MGQ2MDE2M2MzODc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sn8k6hZE8fkqHpnIZ38vltqBs9B7AcSdhl4HaKp0NuA',
      },
    };
    return this.http
      .get<any>(`${this.apiUrl}/3/search/multi?query=${keyword}&page=${page}`,
        optionsGet
      )
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  getDetail(id: string, category: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmY5YmFkNmVkNWM3MmU2MGU3YjAzNGE3ZWMyYjdhMyIsInN1YiI6IjY2MjI1OGZhZTY0MGQ2MDE2M2MzODc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sn8k6hZE8fkqHpnIZ38vltqBs9B7AcSdhl4HaKp0NuA',
      },
    };
    return this.http.get<any>(`${this.apiUrl}/3/${category}/${id}`, options).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Error:', error);
        throw error;
      })
    );
  }

  getMovieComponent(id: string, category: string) {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmY5YmFkNmVkNWM3MmU2MGU3YjAzNGE3ZWMyYjdhMyIsInN1YiI6IjY2MjI1OGZhZTY0MGQ2MDE2M2MzODc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sn8k6hZE8fkqHpnIZ38vltqBs9B7AcSdhl4HaKp0NuA',
      },
    };
    const similarMovies$ = this.http
      .get<any>(`${this.apiUrl}/3/${category}/${id}/similar`, options)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching similar movies:', error);
          throw error;
        })
      );

    const reviews$ = this.http
      .get<any>(`${this.apiUrl}/3/${category}/${id}/reviews`, options)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error fetching movie reviews:', error);
          throw error;
        })
      );

    return forkJoin({
      similarMovies: similarMovies$,
      reviews: reviews$,
    });
  }

  getCollection() {
    return this.http.get<any>(this.jsonUrl);
  }

  getTrending(time: string) {
    const optionsGet = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmY5YmFkNmVkNWM3MmU2MGU3YjAzNGE3ZWMyYjdhMyIsInN1YiI6IjY2MjI1OGZhZTY0MGQ2MDE2M2MzODc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sn8k6hZE8fkqHpnIZ38vltqBs9B7AcSdhl4HaKp0NuA'
      }
    };
    return this.http
      .get<any>(`${this.apiUrl}/3/trending/all/${time}`, optionsGet)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }
}
