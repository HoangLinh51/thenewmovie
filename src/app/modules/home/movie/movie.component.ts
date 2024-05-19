import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaginatorState } from 'primeng/paginator';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent {

  accountInfo: any;
  listNowPlaying: any;
  listPopular: any;
  listTopRated: any;
  listUpcoming: any;
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
    this.getListMovie();
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
  getListMovie() {
    this.fetchMovieList('now_playing', (results) => this.listNowPlaying = results);
    this.fetchMovieList('popular', (results) => this.listPopular = results);
    this.fetchMovieList('top_rated', (results) => this.listTopRated = results);
    this.fetchMovieList('upcoming', (results) => this.listUpcoming = results);
  }

  fetchMovieList(movieList: string, callback: (results: any) => void) {
    const category = 'movie';
    const page = 1;

    this.movieService.getListMovie(category, movieList, page)
      .subscribe((list) => {
        console.log('list', list);
        this.category = category;
        this.totalpage = list.total_pages;
        callback(list.results);
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
  // getListMovie() {
  //   this.getMovieListNowPlaying('movie', 'now_playing', 1);
  //   this.getMovieListPopular('movie', 'popular', 1);
  //   this.getMovieListTopRated('movie', 'top_rated', 1);
  //   this.getMovieListUpcoming('movie', 'upcoming', 1);
  // }
  // getMovieListNowPlaying(category: string, movieList: string, page: number) {
  //   this.movieService
  //     .getListMovie(category, movieList, page)
  //     .subscribe((list) => {
  //       console.log('list', list);
  //       this.category = category;
  //       this.totalpage = list.total_pages;
  //       this.listNowPlaying = list.results;
  //     });
  // }
  // getMovieListPopular(category: string, movieList: string, page: number) {
  //   this.movieService
  //     .getListMovie(category, movieList, page)
  //     .subscribe((list) => {
  //       console.log('list', list);
  //       this.category = category;
  //       this.totalpage = list.total_pages;
  //       this.listPopular = list.results;
  //     });
  // }
  // getMovieListTopRated(category: string, movieList: string, page: number) {
  //   this.movieService
  //     .getListMovie(category, movieList, page)
  //     .subscribe((list) => {
  //       console.log('list', list);
  //       this.category = category;
  //       this.totalpage = list.total_pages;
  //       this.listTopRated = list.results;
  //     });
  // }
  // getMovieListUpcoming(category: string, movieList: string, page: number) {
  //   this.movieService
  //     .getListMovie(category, movieList, page)
  //     .subscribe((list) => {
  //       console.log('list', list);
  //       this.category = category;
  //       this.totalpage = list.total_pages;
  //       this.listUpcoming = list.results;
  //     });
  // }
