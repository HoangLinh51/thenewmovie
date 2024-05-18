import { Component } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent {

  url = 'https://image.tmdb.org/t/p/original'
  accountInfo: any;
  listNowPlaying: any
  listMoviePopular: any;
  listMovieTopRated: any;
  listMovieUpcoming: any;
  listMovieSearch: any;
  isSearching: boolean = false;

  totalpage: number = 0;
  currentPage: number = 0;
  keyword = '';
  category: string = 'movie';

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    this.getAccount();
    this.getMovieList();
  }

  getAccount() {
    this.movieService.getAccountInfo().subscribe(
      (data) => {
        this.accountInfo = data;
        console.log('Account info:', this.accountInfo);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getMovieList() {
    this.getMovieListNowPlaying('movie', 'now_playing', 1)
    this.getMovieListPopular('movie', 'popular', 1)
    this.getMovieListTopRated('movie', 'top_rated', 1)
    this.getMovieListUpcoming('movie', 'upcoming', 1)
  }

  getMovieListNowPlaying(category: string, movieList: string, page: number) {
    this.movieService
      .getListMovie(category, movieList, page)
      .subscribe((list) => {
        this.listNowPlaying = list.results;
      });
  }
  getMovieListPopular(category: string, movieList: string, page: number) {
    this.movieService
      .getListMovie(category, movieList, page)
      .subscribe((list) => {
        this.listMoviePopular = list.results;
      });
  }
  getMovieListTopRated(category: string, movieList: string, page: number) {
    this.movieService
      .getListMovie(category, movieList, page)
      .subscribe((list) => {
        this.listMovieTopRated = list.results;
      });
  }
  getMovieListUpcoming(category: string, movieList: string, page: number) {
    this.movieService
      .getListMovie(category, movieList, page)
      .subscribe((list) => {
        this.listMovieUpcoming = list.results;
      });
  }

  search(): void {
    if (this.keyword.trim() !== '') {
      this.isSearching = true;
      this.movieService
        .searchMovies(this.category, this.keyword)
        .subscribe((data) => {
          this.listMovieSearch = data.results;
          console.log(data.results);
        });
    } else if (this.keyword.trim() === '') {
      this.isSearching = false;
    }
  }
}
