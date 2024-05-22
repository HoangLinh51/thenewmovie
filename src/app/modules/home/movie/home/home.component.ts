import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  accountInfo: any;

  movieNowPlaying: any;
  moviePopular: any;
  movieTopRated: any;
  movieUpcoming: any;
  tvAiringToday: any 
  tvOnTheAir: any 
  tvPopular: any
  tvTopRated: any
  listMovieSearch: any;
  isSearching: boolean = false;
  user!: FormGroup;

  imgUrl = 'https://image.tmdb.org/t/p/original';
  totalpage: number = 0;
  currentPage: number = 0;
  keyword = '';
  request_token: string = '';
  category: string = 'movie';

  constructor(private movieService: MovieService, private form: FormBuilder) {}

  ngOnInit() {
    this.user = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.getAccount();
    this.getList();
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
  getList() {
    this.fetchMovieList('now_playing',(results) => (this.movieNowPlaying = results));
    this.fetchMovieList('popular', (results) => (this.moviePopular = results));
    this.fetchMovieList('top_rated',(results) => (this.movieTopRated = results));
    this.fetchMovieList('upcoming', (results) => (this.movieUpcoming = results));

    this.fetchTVList('airing_today', (results) => (this.tvAiringToday = results));
    this.fetchTVList('on_the_air', (results) => (this.tvOnTheAir = results));
    this.fetchTVList('popular', (results) => (this.tvPopular = results));
    this.fetchTVList('top_rated', (results) => (this.tvTopRated = results));
  }

  fetchMovieList(movieList: string, callback: (results: any) => void) {
    const category = 'movie';
    const page = 1;

    this.movieService
      .getList(category, movieList, page)
      .subscribe((list) => {
        this.totalpage = list.total_pages;
        callback(list.results);
      });
  }

  fetchTVList(TvList: string, callback: (results: any) => void) {
    const category = 'tv';
    const page = 1;

    this.movieService
      .getList(category, TvList, page)
      .subscribe((list) => {
        this.totalpage = list.total_pages;
        callback(list.results);
      });
  }
}
