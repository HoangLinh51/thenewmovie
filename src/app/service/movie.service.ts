import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org';
  constructor(private http: HttpClient) {}
  getAccountInfo() {
    const optionsGet = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmY5YmFkNmVkNWM3MmU2MGU3YjAzNGE3ZWMyYjdhMyIsInN1YiI6IjY2MjI1OGZhZTY0MGQ2MDE2M2MzODc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sn8k6hZE8fkqHpnIZ38vltqBs9B7AcSdhl4HaKp0NuA',
      },
    };
    return this.http
      .get<any>(this.apiUrl + '3/account/21222601', optionsGet)
      .pipe(
        map((response) => response),
        catchError((error) => {
          console.error('Error:', error);
          throw error;
        })
      );
  }

  getListMovie(category: string, movieList: string, page: number) {
    const optionsGet = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmY5YmFkNmVkNWM3MmU2MGU3YjAzNGE3ZWMyYjdhMyIsInN1YiI6IjY2MjI1OGZhZTY0MGQ2MDE2M2MzODc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sn8k6hZE8fkqHpnIZ38vltqBs9B7AcSdhl4HaKp0NuA'
      }
    };
    return this.http
      .get<any>(
        this.apiUrl + '/3/' + category + '/' + movieList,
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

  searchMovies(category: string, keyword: string): Observable<any> {
    const optionsGet = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmY5YmFkNmVkNWM3MmU2MGU3YjAzNGE3ZWMyYjdhMyIsInN1YiI6IjY2MjI1OGZhZTY0MGQ2MDE2M2MzODc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sn8k6hZE8fkqHpnIZ38vltqBs9B7AcSdhl4HaKp0NuA',
      },
    };
    return this.http
      .get<any>(
        this.apiUrl + '/3/search/' + category + '?query=' + keyword,
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

  getMovieById(id:string) {
    const optionsGet = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmY5YmFkNmVkNWM3MmU2MGU3YjAzNGE3ZWMyYjdhMyIsInN1YiI6IjY2MjI1OGZhZTY0MGQ2MDE2M2MzODc2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Sn8k6hZE8fkqHpnIZ38vltqBs9B7AcSdhl4HaKp0NuA'
      }
    };
    return this.http
      .get<any>(
        this.apiUrl + '/3/movie/' + id,
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
}
