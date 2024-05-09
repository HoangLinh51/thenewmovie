import { Component } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent {
  accountInfo: any;
  listMovie: any;
  listMovieSearch: any;
  isSearching: boolean = false;

  totalpage: number = 0;
  currentPage: number = 0;
  keyword = '';
  category: string = 'movie';
  classify: string = 'now_playing';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.getAccount();
    this.getMovieList(this.category, this.classify, 1);
  }

  onPageChange(event: PaginatorState) {
    if (event.page !== undefined) {
      this.currentPage = event.page + 1;
      this.getMovieList(this.category, this.classify, this.currentPage);
    }
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

  getMovieList(category: string, movieList: string, page: number) {
    this.movieService
      .getListMovie(category, movieList, page)
      .subscribe((list) => {
        console.log('list', list);
        this.classify = movieList;
        this.category = category;
        this.totalpage = list.total_pages;
        this.listMovie = list.results;
      });
  }

  search(): void {
    if (this.keyword.trim() !== '') {
      this.isSearching = true;
      this.movieService
        .searchMovies(this.category, this.keyword)
        .subscribe((data) => {
          this.listMovie = data.results;
          console.log(data.results);
        });
    } else if (this.keyword.trim() === '') {
      this.isSearching = false;
    }
  }
}
